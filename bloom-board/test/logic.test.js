import assert from 'node:assert/strict'
import test from 'node:test'
import {
	changeApplicationStatus,
	createApplication,
	createStarterApplications,
	filterApplications,
	getApplicationStats,
	isDueThisWeek,
	removeApplication,
	upsertApplication,
} from '../src/logic.js'

const now = new Date(2026, 9, 5, 12)

test('starter applications have follow-up dates relative to the current date', () => {
	const applications = createStarterApplications(now)
	assert.equal(applications.length, 3)
	assert.equal(applications[0].dueDate, '2026-10-10')
	assert.equal(applications[2].dueDate, '2026-10-07')
})

test('search matches organization, role, and status without case sensitivity', () => {
	const applications = createStarterApplications(now)
	assert.deepEqual(filterApplications(applications, 'LUNA').map(({ id }) => id), ['luna-studio'])
	assert.deepEqual(filterApplications(applications, 'interview').map(({ id }) => id), ['nova-labs'])
})

test('summary counts applications, interviews, and due dates this week', () => {
	const applications = createStarterApplications(now)
	assert.deepEqual(getApplicationStats(applications, now), { total: 3, interviews: 1, dueThisWeek: 2 })
	assert.equal(isDueThisWeek('2026-10-13', now), false)
	assert.equal(isDueThisWeek('', now), false)
})

test('applications can be added, edited, status-updated, and removed immutably', () => {
	const initial = createStarterApplications(now)
	const added = upsertApplication(initial, { company: '  Fern Co  ', role: '  Designer  ', status: 'Saved', dueDate: '', notes: '' })
	assert.equal(added.length, 4)
	assert.equal(added[0].company, 'Fern Co')
	assert.equal(initial.length, 3)

	const id = added[0].id
	const edited = upsertApplication(added, { company: 'Fern Studio', role: 'Design intern', status: 'Applied', dueDate: '', notes: 'Follow up' }, id)
	assert.equal(edited[0].company, 'Fern Studio')
	assert.equal(edited.length, 4)

	const updated = changeApplicationStatus(edited, id, 'Interview')
	assert.equal(updated[0].status, 'Interview')
	assert.equal(removeApplication(updated, id).length, 3)
	assert.equal(createApplication({ company: '  Maple  ', role: '  Engineer  ' }).role, 'Engineer')
})

test('an invalid application is not added', () => {
	const applications = createStarterApplications(now)
	assert.equal(upsertApplication(applications, { company: ' ', role: 'Engineer' }).length, 3)
})
