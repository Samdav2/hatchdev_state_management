import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { logoutUser } from '../redux/user/userSlice'
import {
  DashboardIcon,
  DatabaseIcon,
  LogOutIcon,
  ShieldIcon,
  SparklesIcon,
  XIcon,
} from './icons'

interface SidebarProps {
  currentTab?: string
  onTabChange?: (tab: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = ({
  currentTab = 'dashboard',
  onTabChange,
  isOpen = false,
  onClose,
}: SidebarProps) => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Profile', icon: DashboardIcon },
    { id: 'inspector', label: 'Redux Inspector', icon: DatabaseIcon },
  ]

  const getInitials = (name: string) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const content = (
    <div className="h-full flex flex-col justify-between p-4 bg-slate-900 border-r border-slate-800 text-slate-200">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-3 mb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                HatchDev
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  RTK
                </span>
              </div>
              <div className="text-[11px] text-slate-400">State Management</div>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close menu"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange?.(item.id)
                  onClose?.()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Redux State Slice Card */}
        <div className="mt-8 px-3 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <DatabaseIcon className="w-3.5 h-3.5 text-indigo-400" />
              Store Status
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {user.isLoggedIn ? (
              <span className="text-emerald-400">user: authenticated</span>
            ) : (
              <span className="text-amber-400">user: unauthenticated</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="pt-4 border-t border-slate-800/80">
        {user.isLoggedIn ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex-shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-300 border border-slate-700/70 text-slate-300 text-xs font-medium transition-all cursor-pointer active:scale-95"
            >
              <LogOutIcon className="w-4 h-4 text-slate-400 hover:text-red-400" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 text-center">
            <ShieldIcon className="w-5 h-5 text-slate-500 mx-auto mb-1.5" />
            <div className="text-xs font-medium text-slate-400">Guest Mode</div>
            <div className="text-[11px] text-slate-400">Sign in to test state dispatching</div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar