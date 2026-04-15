import './app.css'
import { openStates } from './lib/uiState.js'
import App from './App.svelte'

const rawOpen = new URLSearchParams(window.location.search).get('open')
if (rawOpen) openStates.set(new Set(rawOpen.split(',')))

const app = new App({ target: document.getElementById('app') })
export default app
