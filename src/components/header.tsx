import ThemeToggle from '@/components/theme-toggle'

export default function Header() {
  return (
    <header className="flex w-full items-center justify-center p-4">
      <ThemeToggle />

      <p className="flex flex-1 items-center justify-end text-sm text-gray-500 dark:text-gray-400">
        <a href="https://cargill.dev" className="hover:underline">
          Dan Cargill
        </a>
      </p>
    </header>
  )
}
