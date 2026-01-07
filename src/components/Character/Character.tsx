import Ecctrl from 'ecctrl'

export default function Character() {

  return (
    <Ecctrl
      capsuleRadius={0.35}
      capsuleHalfHeight={0.45}
      floatHeight={0.3}
      characterInitDir={0}
      camInitDis={-5}
      camMaxDis={-7}
      camMinDis={-3}
      camInitDir={{ x: 0.3, y: 0 }}
      maxVelLimit={5}
      turnVelMultiplier={0.8}
      turnSpeed={15}
      sprintMult={2}
      jumpVel={8}
      position={[0, 2, 0]}
      animated={false}
    >
      {/* Placeholder character model - capsule with face */}
      <group>
        {/* Body */}
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.3, 0.6, 4, 16]} />
          <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Face indicator (shows forward direction) */}
        <mesh position={[0, 0.2, 0.28]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.12, 0.2, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[-0.12, 0.2, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Glow effect */}
        <pointLight intensity={0.5} distance={3} color="#6366f1" />
      </group>
    </Ecctrl>
  )
}
