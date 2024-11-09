import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <div>
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
