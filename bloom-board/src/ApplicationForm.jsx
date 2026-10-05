import { useState } from 'react'
import { STATUSES } from './logic.js'

const EMPTY_FORM = { company: '', role: '', status: 'Applied', dueDate: '', notes: '' }

function ApplicationForm({ initialValue = EMPTY_FORM, isEditing = false, onSubmit, onCancel }) {
	const [form, setForm] = useState(() => ({ ...EMPTY_FORM, ...initialValue }))

	function handleSubmit(event) {
		event.preventDefault()
		if (!form.company.trim() || !form.role.trim()) return
		onSubmit(form)
	}

	return (
		<section className="application-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
			<div className="modal-heading">
				<div><p className="section-kicker">A NEW LITTLE OPPORTUNITY</p><h2 id="modal-title">{isEditing ? 'Edit application' : 'Add an application'}</h2></div>
				<button className="modal-close" type="button" onClick={onCancel} aria-label="Close dialog">×</button>
			</div>
			<form onSubmit={handleSubmit}>
				<label className="form-label">Organization<input autoFocus required maxLength={80} value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="e.g. Luna Studio" /></label>
				<label className="form-label">Role or opportunity<input required maxLength={100} value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} placeholder="e.g. Product designer" /></label>
				<div className="form-row">
					<label className="form-label">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
					<label className="form-label">Follow-up date<input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} /></label>
				</div>
				<label className="form-label">Notes <span className="optional-label">(optional)</span><textarea rows="3" maxLength={400} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="A detail you want to remember..." /></label>
				<div className="form-actions"><button className="cancel-button" type="button" onClick={onCancel}>Cancel</button><button className="add-button" type="submit">{isEditing ? 'Save changes' : 'Save application'}</button></div>
			</form>
		</section>
	)
}

export default ApplicationForm
