import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { portfolioData } from '../../data/portfolio'

export default function ContactZone() {
  return (
    <group position={[0, 0, 25]}>
      {/* Zone title */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <group position={[0, 4, 0]}>
          <Text
            fontSize={0.6}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Contact
          </Text>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.5, 0.03, 0.03]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Contact cards */}
      {portfolioData.contact.map((contact, index) => {
        const angle = (index / portfolioData.contact.length) * Math.PI - Math.PI / 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <ContactCard
            key={contact.type}
            type={contact.type}
            value={contact.value}
            link={contact.link}
            position={[x, 1.5, z]}
            index={index}
          />
        )
      })}

      {/* Email display */}
      <group position={[0, 2, -3]}>
        <Text
          fontSize={0.2}
          color="#a1a1aa"
          anchorX="center"
          anchorY="middle"
        >
          Let's connect!
        </Text>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.25}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
        >
          {portfolioData.email}
        </Text>
      </group>

      {/* Decorative platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function ContactCard({
  type,
  value,
  link,
  position,
  index
}: {
  type: string
  value: string
  link?: string
  position: [number, number, number]
  index: number
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  useFrame((state) => {
    if (ref.current) {
      // Floating animation
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.1

      // Face camera
      ref.current.lookAt(camera.position)

      // Scale on hover
      const targetScale = hovered ? 1.1 : 1
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  const colors: Record<string, string> = {
    Email: '#ef4444',
    LinkedIn: '#0077b5',
    GitHub: '#6e5494',
    Website: '#f59e0b'
  }

  const color = colors[type] || '#f59e0b'

  return (
    <group
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Card background */}
      <RoundedBox args={[2.5, 1.2, 0.1]} radius={0.1}>
        <meshStandardMaterial
          color="#0a0a0f"
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Border glow */}
      <RoundedBox args={[2.6, 1.3, 0.08]} radius={0.12} position={[0, 0, -0.02]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={0.5}
        />
      </RoundedBox>

      {/* Type label */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {type}
      </Text>

      {/* Value */}
      <Text
        position={[0, -0.15, 0.06]}
        fontSize={0.14}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>

      {/* Click indicator */}
      {link && (
        <Text
          position={[0, -0.45, 0.06]}
          fontSize={0.08}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
        >
          Click to open
        </Text>
      )}

      {/* Glow effect */}
      <pointLight intensity={hovered ? 1.5 : 0.5} distance={3} color={color} />
    </group>
  )
}
