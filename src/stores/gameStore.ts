import { create } from 'zustand'

interface GameState {
  // Currently active/selected item
  activeProject: string | null
  setActiveProject: (id: string | null) => void

  // Player position for proximity detection
  playerPosition: [number, number, number]
  setPlayerPosition: (pos: [number, number, number]) => void

  // UI states
  showControls: boolean
  setShowControls: (show: boolean) => void

  // Loading state
  isLoaded: boolean
  setIsLoaded: (loaded: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
  activeProject: null,
  setActiveProject: (id) => set({ activeProject: id }),

  playerPosition: [0, 0, 0],
  setPlayerPosition: (pos) => set({ playerPosition: pos }),

  showControls: true,
  setShowControls: (show) => set({ showControls: show }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}))
