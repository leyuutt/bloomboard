export const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']

function formatLocalDate(date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

function dateAfterDays(days, from = new Date()) {
	const date = new Date(from)
	date.setDate(date.getDate() + days)
	return formatLocalDate(date)
}

export function createStarterApplications(now = new Date()) {
	return [
		{ id: 'luna-studio', company: 'Luna Studio', role: 'Frontend intern', status: 'Applied', dueDate: dateAfterDays(5, now), notes: '' },
		{ id: 'petal-foundation', company: 'Petal Foundation', role: 'Scholarship', status: 'Saved', dueDate: '', notes: '' },
		{ id: 'nova-labs', company: 'Nova Labs', role: 'Junior developer', status: 'Interview', dueDate: dateAfterDays(2, now), notes: '' },
	]
}

export function isDueThisWeek(dateString, now = new Date()) {
	if (!dateString) return false
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	const dueDate = new Date(`${dateString}T00:00:00`)
	const weekFromNow = new Date(today)
	weekFromNow.setDate(today.getDate() + 7)
	return !Number.isNaN(dueDate.getTime()) && dueDate >= today && dueDate <= weekFromNow
}

export function formatDate(dateString) {
	if (!dateString) return ''
	const date = new Date(`${dateString}T00:00:00`)
	return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
}

export function filterApplications(applications, search) {
	const query = search.trim().toLowerCase()
	return applications.filter((application) =>
		`${application.company} ${application.role} ${application.status}`.toLowerCase().includes(query),
	)
}

export function getApplicationStats(applications, now = new Date()) {
	return {
		total: applications.length,
		interviews: applications.filter((application) => application.status === 'Interview').length,
		dueThisWeek: applications.filter((application) => isDueThisWeek(application.dueDate, now)).length,
	}
}

export function createApplication(fields) {
	const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
	return { ...fields, id, company: fields.company.trim(), role: fields.role.trim() }
}

export function upsertApplication(applications, fields, id = null) {
	const company = fields.company.trim()
	const role = fields.role.trim()
	if (!company || !role) return applications

	if (id) {
		return applications.map((application) => application.id === id
			? { ...application, ...fields, company, role }
			: application)
	}
	return [createApplication({ ...fields, company, role }), ...applications]
}

export function removeApplication(applications, id) {
	return applications.filter((application) => application.id !== id)
}

export function changeApplicationStatus(applications, id, status) {
	return applications.map((application) => application.id === id ? { ...application, status } : application)
}
