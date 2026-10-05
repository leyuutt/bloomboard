import { useMemo, useState } from 'react'
import ApplicationCard from './ApplicationCard.jsx'
import ApplicationForm from './ApplicationForm.jsx'
import { changeApplicationStatus, filterApplications, getApplicationStats, removeApplication, upsertApplication } from './logic.js'
import { loadApplications, persistApplications } from './storage.js'

function Home() {
    const [applications, setApplications] = useState(loadApplications)
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingApplication, setEditingApplication] = useState(null)

    const filteredApplications = useMemo(() => filterApplications(applications, search), [applications, search])
    const stats = getApplicationStats(applications)

    function saveApplications(nextApplications) {
        setApplications(nextApplications)
        persistApplications(nextApplications)
    }

    function openNewApplication() {
        setEditingApplication(null)
        setModalOpen(true)
    }

    function openEditApplication(application) {
        setEditingApplication(application)
        setModalOpen(true)
    }

    function handleSubmit(form) {
        saveApplications(upsertApplication(applications, form, editingApplication?.id))
        setModalOpen(false)
    }

    function deleteApplication(id) {
        saveApplications(removeApplication(applications, id))
    }

    function updateStatus(id, status) {
        saveApplications(changeApplicationStatus(applications, id, status))
    }

    return (
        <main className="app-shell">
            <header className="topbar">
                <a className="brand" href="#home" aria-label="BloomBoard home"><span className="brand-mark" aria-hidden="true">✿</span> BloomBoard</a>
                <span className="topbar-label">A little more clarity, one application at a time.</span>
            </header>

            <section className="home" id="home">
                <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAREER, IN BLOOM</div>
                <h1 className="chapter-title">Your next chapter starts here.</h1>
                <p className="description">A calm little space to stay on top of things.</p>

                <section className="stats-grid" aria-label="Application summary">
                    <article className="stat-card stat-card-primary"><span>Applications</span><strong>{stats.total}</strong><small>in your garden</small></article>
                    <article className="stat-card"><span>Interviews</span><strong>{stats.interviews}</strong><small>conversations growing</small></article>
                    <article className="stat-card"><span>Due this week</span><strong>{stats.dueThisWeek}</strong><small>little things to do</small></article>
                </section>

                <section className="applications-section" aria-label="Your applications">
                    <div className="list-heading">
                        <div><p className="section-kicker">YOUR GARDEN</p><h2>Applications <span className="count-pill">{stats.total}</span></h2></div>
                        <button className="add-button" type="button" onClick={openNewApplication}><span aria-hidden="true">＋</span> Add application</button>
                    </div>

                    <label className="search-field">
                        <span className="search-icon" aria-hidden="true">⌕</span>
                        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search organization or role..." aria-label="Search applications" />
                        {search && <button className="clear-search" type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
                    </label>

                    <div className="application-list">
                        {filteredApplications.map((application) => (
                            <ApplicationCard key={application.id} application={application} onEdit={openEditApplication} onDelete={deleteApplication} onStatusChange={updateStatus} />
                        ))}
                        {filteredApplications.length === 0 && (
                            <div className="empty-state">
                                <span className="empty-flower" aria-hidden="true">✿</span>
                                <h3>{search ? 'No matches just yet' : 'A fresh start'}</h3>
                                <p>{search ? 'Try another company or role.' : 'Add your first application and watch your garden grow.'}</p>
                                {!search && <button type="button" className="text-button" onClick={openNewApplication}>Add your first application <span aria-hidden="true">→</span></button>}
                            </div>
                        )}
                    </div>
                </section>
                <footer className="footer-note"><span aria-hidden="true">✿</span> Every small step is still progress.</footer>
            </section>

            {modalOpen && (
                <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
                    <ApplicationForm key={editingApplication?.id ?? 'new'} initialValue={editingApplication ?? undefined} isEditing={Boolean(editingApplication)} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
                </div>
            )}
        </main>
    )
}

export default Home