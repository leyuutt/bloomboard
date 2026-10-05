import { STATUSES, formatDate } from './logic.js'

function ApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
	return (
		<article className="application-card">
			<div className="company-avatar" aria-hidden="true">{application.company.slice(0, 1).toUpperCase()}</div>
			<div className="application-info">
				<h3>{application.company}</h3>
				<p>{application.role}</p>
				{application.dueDate && <span className="due-date">◷ {formatDate(application.dueDate)}</span>}
				{application.notes && <p className="application-notes">{application.notes}</p>}
			</div>
			<div className="card-actions">
				<label className={`status-badge status-${application.status.toLowerCase()}`}>
					<span className="sr-only">Status: </span>
					<select value={application.status} onChange={(event) => onStatusChange(application.id, event.target.value)} aria-label={`Change status for ${application.company}`}>
						{STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
					</select>
				</label>
				<div className="card-menu">
					<button type="button" onClick={() => onEdit(application)} aria-label={`Edit ${application.company}`}>Edit</button>
					<button type="button" className="delete-action" onClick={() => onDelete(application.id)} aria-label={`Delete ${application.company}`}>Delete</button>
				</div>
			</div>
		</article>
	)
}

export default ApplicationCard
