import { writable } from 'svelte/store'

/**
 * Set of UI state keys that should be open on page load.
 * Populated from ?open=key1,key2,... at boot time.
 */
export const openStates = writable(new Set())
