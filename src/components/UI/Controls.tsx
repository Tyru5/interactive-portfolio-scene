import { useState, useEffect } from 'react'

export default function Controls() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-8 left-8 z-40 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white transition-opacity duration-500 border border-gray-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <h3 className="text-sm font-semibold mb-3 text-purple-400">Controls</h3>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-3">
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs min-w-[60px] text-center border border-gray-600">W / S</kbd>
          <span className="text-gray-300">Forward / Back</span>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs min-w-[60px] text-center border border-gray-600">A / D</kbd>
          <span className="text-gray-300">Turn Left / Right</span>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs min-w-[60px] text-center border border-gray-600">Space</kbd>
          <span className="text-gray-300">Jump</span>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs min-w-[60px] text-center border border-gray-600">Shift</kbd>
          <span className="text-gray-300">Sprint</span>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs min-w-[60px] text-center border border-gray-600">Click</kbd>
          <span className="text-gray-300">Open Links</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mt-3">Walk near objects to see info</p>
    </div>
  )
}
