import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import UserPage from './components/UserPage'
import { DatabaseIcon, SparklesIcon } from './components/icons'

const App = () => {
  const user = useSelector((state: RootState) => state.user)
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'inspector'>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getPageTitle = () => {
    if (!user.isLoggedIn) return 'Sign In & Overview'
    if (currentTab === 'inspector') return 'Redux State Inspector'
    return 'User Dashboard & Profile'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab as 'dashboard' | 'inspector')}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Navbar */}
        <Navbar
          currentTitle={getPageTitle()}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {user.isLoggedIn ? (
            currentTab === 'dashboard' ? (
              <UserPage />
            ) : (
              /* Dedicated Redux Inspector Tab */
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <DatabaseIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Redux Toolkit State Explorer</h2>
                      <p className="text-xs text-slate-400">
                        Live snapshot of all configured reducers in the application store.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Active User Slice (state.user)
                    </div>
                    <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-emerald-400 font-mono text-sm overflow-x-auto shadow-inner">
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )
          ) : (
            /* Unauthenticated View: Login and Architecture Overview */
            <div className="py-6 sm:py-10 space-y-10">
              <Login />

              {/* Information Callout */}
              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <SparklesIcon className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">State Management Demo:</span>{' '}
                  This application uses Redux Toolkit (<code className="text-indigo-300">@reduxjs/toolkit</code>) and React Redux (<code className="text-indigo-300">react-redux</code>) with strict TypeScript contracts. Sign in or choose a persona above to initialize and manage user state across components.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App