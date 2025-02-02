'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { MODES } from '@/lib/utils/mode'

export interface ModeContextType {
  mode: string
  setMode: (mode: string) => void
}

export const ModeContext = createContext<ModeContextType>({
  mode: MODES.SLIDESHOW,
  setMode: () => {},
})

interface ModeProviderProps {
  children: ReactNode
}

export function ModeProvider({ children }: ModeProviderProps) {
  const [mode, setMode] = useState<string>(MODES.SLIDESHOW)
  const searchParams = useSearchParams()
  const newMode = searchParams.get('mode')

  useEffect(() => {
    if (newMode) setMode(newMode)
  }, [newMode])

  const contextValue: ModeContextType = {
    mode,
    setMode,
  }

  return (
    <ModeContext.Provider value={contextValue}>{children}</ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
