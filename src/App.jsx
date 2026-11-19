import { TemplateRenderer } from './templates'
import { useLandingPage } from './hooks/useLandingPage'

function App() {
  const { state, retry } = useLandingPage()

  if (state.status === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center px-6 text-slate-600" aria-live="polite">
        Loading landing page…
      </main>
    )
  }

  if (state.status === 'error') {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Landing page unavailable
          </h1>
          <p className="mt-3 text-slate-600">{state.message}</p>
          <button
            className="mt-6 rounded-full bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  return <TemplateRenderer page={state.page} />
}

export default App
