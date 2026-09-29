import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { MailIcon, ShieldIcon, SparklesIcon } from './icons'

interface UserProfileProps {
  variant?: 'compact' | 'card'
  className?: string
}

const UserProfile = ({ variant = 'card', className = '' }: UserProfileProps) => {
  const user = useSelector((state: RootState) => state.user)

  const getInitials = (name: string) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  if (variant === 'compact') {
    if (!user.isLoggedIn) {
      return (
        <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 text-xs font-medium ${className}`}>
          <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
          <span>Guest Mode</span>
        </div>
      )
    }

    return (
      <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/50 transition-colors ${className}`}>
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20">
            {getInitials(user.name)}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-semibold text-slate-200 leading-tight flex items-center gap-1.5">
            {user.name}
            {user.role && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {user.role}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 leading-tight truncate max-w-[140px]">
            {user.email}
          </div>
        </div>
      </div>
    )
  }

  // Default 'card' variant
  if (!user.isLoggedIn) {
    return (
      <div className={`bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 text-center backdrop-blur-sm shadow-xl ${className}`}>
        <div className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShieldIcon className="w-8 h-8 opacity-70" />
        </div>
        <h3 className="text-lg font-semibold text-slate-200 mb-1">No Active Session</h3>
        <p className="text-sm text-slate-400 max-w-xs mx-auto mb-4">
          Please log in to inspect user attributes and interact with Redux state.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/70 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-slate-600/80 transition-all ${className}`}>
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30 ring-4 ring-slate-800">
            {getInitials(user.name)}
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-800 flex items-center justify-center" title="Online">
            <span className="w-2 h-2 rounded-full bg-white/70 animate-ping opacity-75" />
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <h2 className="text-xl font-bold text-white tracking-tight truncate">
              {user.name}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <SparklesIcon className="w-3 h-3 text-indigo-400" />
              {user.role || 'Member'}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-slate-300 mb-3 font-mono">
            <MailIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          {user.bio && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
              {user.bio}
            </p>
          )}

          {user.lastLogin && (
            <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Signed in today at {user.lastLogin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile