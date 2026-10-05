import { createStarterApplications } from './logic.js'

const STORAGE_KEY = 'bloomboard-applications'

export function loadApplications() {
	try {
		const saved = globalThis.localStorage?.getItem(STORAGE_KEY)
		return saved ? JSON.parse(saved) : createStarterApplications()
	} catch {
		return createStarterApplications()
	}
}

export function persistApplications(applications) {
	try {
		globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(applications))
	} catch {
		// Keep the application usable for this session if browser storage is unavailable.
	}
}
