import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, RoundedBox } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { portfolioData } from '../../data/portfolio'

export default function SkillsZone() {
  return (
    <group position={[-25, 0, 0]}>
      {/* Zone title */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <group position={[0, 4, 0]}>
          <Text
            fontSize={0.6}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Skills
          </Text>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2, 0.03, 0.03]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Skill categories arranged in quadrants */}
      {portfolioData.skills.map((category, categoryIndex) => {
        const angle = (categoryIndex / portfolioData.skills.length) * Math.PI * 2
        const radius = 5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <SkillCategory
            key={category.category}
            category={category.category}
            items={category.items}
            color={category.color}
            position={[x, 0, z]}
          />
        )
      })}

      {/* Central rotating skill orb */}
      <SkillOrb />

      {/* Decorative platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[10, 32]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function SkillCategory({
  category,
  items,
  color,
  position
}: {
  category: string
  items: string[]
  color: string
  position: [number, number, number]
}) {
  return (
    <group position={position}>
      {/* Category title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {category}
      </Text>

      {/* Skill items as floating cubes */}
      {items.slice(0, 4).map((item, index) => (
        <SkillCube
          key={item}
          name={item}
          color={color}
          position={[
            (index % 2 - 0.5) * 1.5,
            1.5 + Math.floor(index / 2) * 1,
            0
          ]}
          delay={index * 0.2}
        />
      ))}

      {/* Pedestal */}
      <RigidBody type="fixed">
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.5, 0.5, 6]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            roughness={0.5}
          />
        </mesh>
      </RigidBody>
    </group>
  )
}

function SkillCube({
  name,
  color,
  position,
  delay
}: {
  name: string
  color: string
  position: [number, number, number]
  delay: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
    }
  })

  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.45]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.7}
        >
          {name}
        </Text>
      </Float>
    </group>
  )
}

function SkillOrb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={[0, 2, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#10b981"
        emissive="#10b981"
        emissiveIntensity={0.3}
        wireframe
      />
      <pointLight intensity={2} distance={8} color="#10b981" />
    </mesh>
  )
}
