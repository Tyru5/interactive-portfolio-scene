import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Scene from './components/Scene'
import LoadingScreen from './components/UI/LoadingScreen'
import Controls from './components/UI/Controls'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft', 'ShiftRight'] },
]

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 50 }}
        dpr={[1, 2]}
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 30, 100]} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -20, 0]} debug={false}>
            <Scene />
          </Physics>
        </Suspense>
      </Canvas>
      <LoadingScreen />
      <Controls />
    </KeyboardControls>
  )
}

export default App
