import { RigidBody } from '@react-three/rapier'

export default function Ground() {
  return (
    <>
      {/* Main ground plane */}
      <RigidBody type="fixed" friction={1}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <circleGeometry args={[60, 64]} />
          <meshStandardMaterial
            color="#1a1a2e"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </RigidBody>

      {/* Zone indicators on ground */}
      <ZoneIndicator position={[0, 0.01, 0]} color="#8b5cf6" />
      <ZoneIndicator position={[25, 0.01, 0]} color="#06b6d4" />
      <ZoneIndicator position={[-25, 0.01, 0]} color="#10b981" />
      <ZoneIndicator position={[0, 0.01, 25]} color="#f59e0b" />

      {/* Decorative grid pattern */}
      <GridFloor />
    </>
  )
}

function ZoneIndicator({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {/* Glowing circle indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 5, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[120, 60, '#2a2a4a', '#1a1a3a']}
      position={[0, 0.02, 0]}
    />
  )
}
