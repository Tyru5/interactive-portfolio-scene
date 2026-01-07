import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { portfolioData } from '../../data/portfolio'

export default function AboutZone() {
  return (
    <group position={[0, 0, 0]}>
      {/* Central welcome monument */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <group position={[0, 3, -5]}>
          {/* Name */}
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {portfolioData.name}
          </Text>

          {/* Title */}
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.35}
            color="#8b5cf6"
            anchorX="center"
            anchorY="middle"
          >
            {portfolioData.title}
          </Text>

          {/* About text */}
          <Text
            position={[0, 0, 0]}
            fontSize={0.15}
            color="#a1a1aa"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
            textAlign="center"
            lineHeight={1.5}
          >
            {portfolioData.about}
          </Text>

          {/* Decorative element */}
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[4, 0.05, 0.05]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Decorative floating orbs */}
      <FloatingOrb position={[-3, 2, -3]} color="#6366f1" />
      <FloatingOrb position={[3, 2.5, -4]} color="#8b5cf6" />
      <FloatingOrb position={[0, 1.5, -7]} color="#a855f7" />

      {/* Direction indicators */}
      <DirectionSign position={[8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} text="Projects →" color="#06b6d4" />
      <DirectionSign position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]} text="← Skills" color="#10b981" />
      <DirectionSign position={[0, 0, 8]} rotation={[0, Math.PI, 0]} text="Contact ↓" color="#f59e0b" />
    </group>
  )
}

function FloatingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
      <pointLight intensity={1} distance={5} color={color} />
    </mesh>
  )
}

function DirectionSign({
  position,
  rotation,
  text,
  color
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  text: string
  color: string
}) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#2a2a4a" />
        </mesh>
      </RigidBody>
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}
