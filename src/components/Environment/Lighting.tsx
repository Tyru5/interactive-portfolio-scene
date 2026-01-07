export default function Lighting() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />

      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-30, 20, -30]}
        intensity={0.4}
        color="#6366f1"
      />

      {/* Accent lights for zones */}
      <pointLight position={[0, 5, 0]} intensity={2} color="#8b5cf6" distance={20} />
      <pointLight position={[25, 3, 0]} intensity={1.5} color="#06b6d4" distance={15} />
      <pointLight position={[-25, 3, 0]} intensity={1.5} color="#10b981" distance={15} />
      <pointLight position={[0, 3, 25]} intensity={1.5} color="#f59e0b" distance={15} />
    </>
  )
}
