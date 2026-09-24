import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { BrowserRouter } from 'react-router'

type ProvidersProps = {
  children: ReactNode
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const Providers = ({ children }: ProvidersProps) => {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter basename={basename}>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}
