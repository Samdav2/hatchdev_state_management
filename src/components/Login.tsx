import { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user/userSlice'
import { UserIcon, MailIcon, ShieldIcon, SparklesIcon, CheckIcon } from './icons'

const DEMO_ACCOUNTS = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.j@hatchdev.io',
    role: 'Staff Engineer',
    bio: 'Architecting distributed systems and reactive frontend state architectures.',
  },
  {
    name: 'Alex Rivera',
    email: 'alex.rivera@design.co',
    role: 'Design Systems Lead',
    bio: 'Crafting pixel-perfect design systems, accessible UI patterns, and user journeys.',
  },
  {
    name: 'Jordan Vance',
    email: 'jordan.v@cloudops.net',
    role: 'Platform Architect',
    bio: 'Observability enthusiast, container wizard, and Redux state specialist.',
  },
]

interface LoginProps {
  onSuccess?: () => void
}

const Login = ({ onSuccess }: LoginProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Senior Engineer')
  const [bio, setBio] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successNotice, setSuccessNotice] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      dispatch(
        setUser({
          name: name.trim(),
          email: email.trim(),
          role,
          bio: bio.trim() || undefined,
        })
      )
      setIsSubmitting(false)
      setSuccessNotice(true)
      onSuccess?.()
    }, 350)
  }

  const applyDemoUser = (demo: (typeof DEMO_ACCOUNTS)[number]) => {
    setName(demo.name)
    setEmail(demo.email)
    setRole(demo.role)
    setBio(demo.bio)
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 mb-4 ring-4 ring-slate-800">
              <ShieldIcon className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Sign In to Your Workspace
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
              Authenticate to initialize Redux state and access your real-time user dashboard.
            </p>
          </div>

          {/* Quick Demo Fill Pills */}
          <div className="mb-6 bg-slate-900/60 rounded-2xl p-3 border border-slate-700/50">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
              <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quick Test Personas (1-Click Fill)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((demo) => (
                <button
                  key={demo.name}
                  type="button"
                  onClick={() => applyDemoUser(demo)}
                  className="text-left px-2.5 py-2 rounded-xl bg-slate-800/70 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/60 transition-all text-xs group"
                >
                  <div className="font-medium text-slate-200 group-hover:text-indigo-300 truncate">
                    {demo.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {demo.role}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-name"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="login-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MailIcon className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-role"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Role / Title
              </label>
              <select
                id="login-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all shadow-inner cursor-pointer"
              >
                <option value="Senior Engineer">Senior Engineer</option>
                <option value="Staff Engineer">Staff Engineer</option>
                <option value="Design Systems Lead">Design Systems Lead</option>
                <option value="Platform Architect">Platform Architect</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name || !email}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Redux Store...</span>
                </>
              ) : successNotice ? (
                <>
                  <CheckIcon className="w-4 h-4 text-emerald-300" />
                  <span>Logged in! Redirecting...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  <span>Sign In & Initialize State</span>
                </>
              )}
            </button>
          </form>

          {/* Redux State Note Footer */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Redux Toolkit Store Ready
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              userSlice.ts
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login