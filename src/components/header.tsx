import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">InvestiX</span>
          </div>
          <nav className="hidden items-center space-x-4 md:flex"></nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
