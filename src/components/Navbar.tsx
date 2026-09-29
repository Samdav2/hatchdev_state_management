import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import UserProfile from './UserProfile'
import { BellIcon, MenuIcon, SearchIcon } from './icons'

interface NavbarProps {
  onToggleSidebar?: () => void
  currentTitle?: string
}

const Navbar = ({
  onToggleSidebar,
  currentTitle = 'Dashboard',
}: NavbarProps) => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Page Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
            App
          </span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Middle: Quick Search (Desktop) */}
      <div className="hidden md:flex items-center max-w-xs w-full mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search state, users, slices..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <kbd className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-mono text-slate-500">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Redux State Pill, Bell & Profile */}
      <div className="flex items-center gap-3">
        {/* Redux Sync Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              user.isLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-slate-300 font-medium">
            {user.isLoggedIn ? 'State Synced' : 'Ready'}
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <BellIcon className="w-4 h-4" />
          {user.isLoggedIn && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
          )}
        </button>

        {/* User Profile Chip */}
        <UserProfile variant="compact" />
      </div>
    </header>
  )
}

export default Navbar