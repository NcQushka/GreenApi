import { LanguageSwitch } from '@/features/switch-language'
import { LoginForm } from '@/features/login'

export const LoginPage = () => (
  <main className="flex min-h-svh items-center justify-center bg-canvas px-4">
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-panel p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Telegram</h1>
        <LanguageSwitch />
      </header>
      <LoginForm />
    </div>
  </main>
)
