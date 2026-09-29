import { useState, type FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { updateUser, logoutUser } from '../redux/user/userSlice'
import UserProfile from './UserProfile'
import {
  DatabaseIcon,
  SparklesIcon,
  ShieldIcon,
  EditIcon,
  CheckIcon,
  LogOutIcon,
  UserIcon,
  MailIcon,
} from './icons'

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  const [editRole, setEditRole] = useState(user.role || 'Senior Engineer')
  const [editBio, setEditBio] = useState(user.bio || '')
  const [copiedState, setCopiedState] = useState(false)

  // Start edit mode with current store values
  const handleOpenEdit = () => {
    setEditName(user.name)
    setEditEmail(user.email)
    setEditRole(user.role || 'Senior Engineer')
    setEditBio(user.bio || '')
    setIsEditing(true)
  }

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      updateUser({
        name: editName,
        email: editEmail,
        role: editRole,
        bio: editBio,
      })
    )
    setIsEditing(false)
  }

  const handleCopyState = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2))
    setCopiedState(true)
    setTimeout(() => setCopiedState(false), 2000)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (!user.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-indigo-400">
          <ShieldIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Active Session</h2>
        <p className="text-sm text-slate-400 mb-6">
          Log in using the form to populate user state and see real-time Redux synchronization.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-800/80 to-purple-900/40 border border-indigo-500/20 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Redux Store: Active & Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {getGreeting()}, {user.name}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              This dashboard reflects your centralized state in Redux Toolkit. Any modification here dispatches immediately across all components.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/30 transition-all cursor-pointer active:scale-95"
            >
              <EditIcon className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => dispatch(logoutUser())}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 border border-slate-700/80 text-slate-300 text-xs sm:text-sm font-medium transition-all cursor-pointer active:scale-95"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal / Inline Panel */}
      {isEditing && (
        <div className="bg-slate-800/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/70">
            <div className="flex items-center gap-2">
              <EditIcon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-semibold text-white">Edit Redux User State</h3>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-md bg-slate-700/50"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <MailIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Title</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Senior Engineer">Senior Engineer</option>
                <option value="Staff Engineer">Staff Engineer</option>
                <option value="Design Systems Lead">Design Systems Lead</option>
                <option value="Platform Architect">Platform Architect</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Notes</label>
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Brief summary or status"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Save to Redux State</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Grid: User Profile Card & Redux State Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Full User Card */}
        <div className="lg:col-span-7 space-y-6">
          <UserProfile variant="card" />

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xs text-slate-400 font-medium">Session Status</div>
              <div className="text-base font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xs text-slate-400 font-medium">Redux Slices</div>
              <div className="text-base font-semibold text-indigo-300 mt-1">
                1 Slice (user)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400 font-medium">Authentication</div>
              <div className="text-base font-semibold text-purple-300 mt-1">
                Verified
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Redux State Inspector */}
        <div className="lg:col-span-5">
          <div className="h-full bg-slate-900/90 border border-slate-700/70 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Redux Store Inspector
                  </span>
                </div>
                <button
                  onClick={handleCopyState}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  {copiedState ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy JSON</span>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 mb-2">
                Path: <span className="font-mono text-indigo-300">state.user</span>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-indigo-200 text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Managed by @reduxjs/toolkit</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Sync
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage