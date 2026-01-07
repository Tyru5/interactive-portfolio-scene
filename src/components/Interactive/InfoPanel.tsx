import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface InfoPanelProps {
  title: string
  description: string
  tags?: string[]
  link?: string
  color?: string
  position?: [number, number, number]
  visible?: boolean
}

export default function InfoPanel({
  title,
  description,
  tags = [],
  link,
  color = '#6366f1',
  position = [0, 2.5, 0],
  visible = true
}: InfoPanelProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05

      // Always face camera
      groupRef.current.lookAt(state.camera.position)

      // Scale animation based on visibility
      const targetScale = visible ? 1 : 0
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel */}
      <RoundedBox
        args={[3.5, 2.2, 0.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.05]}
      >
        <meshStandardMaterial
          color="#0a0a0f"
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Glowing border */}
      <RoundedBox
        args={[3.6, 2.3, 0.08]}
        radius={0.12}
        smoothness={4}
        position={[0, 0, -0.1]}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={3}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.12}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
        lineHeight={1.4}
      >
        {description}
      </Text>

      {/* Tags */}
      {tags.length > 0 && (
        <group position={[0, -0.4, 0]}>
          {tags.slice(0, 3).map((tag, index) => (
            <group key={tag} position={[(index - 1) * 1, 0, 0]}>
              <RoundedBox args={[0.9, 0.25, 0.05]} radius={0.05}>
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.3}
                />
              </RoundedBox>
              <Text
                position={[0, 0, 0.03]}
                fontSize={0.09}
                color={color}
                anchorX="center"
                anchorY="middle"
              >
                {tag}
              </Text>
            </group>
          ))}
        </group>
      )}

      {/* Link indicator */}
      {link && (
        <group position={[0, -0.8, 0]}>
          <Text
            fontSize={0.1}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
          >
            Click to visit →
          </Text>
        </group>
      )}
    </group>
  )
}
