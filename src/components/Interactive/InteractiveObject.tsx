import { useRef, useState, ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import InfoPanel from './InfoPanel'

interface InteractiveObjectProps {
  position: [number, number, number]
  title: string
  description: string
  tags?: string[]
  link?: string
  color?: string
  children?: ReactNode
  proximityDistance?: number
}

export default function InteractiveObject({
  position,
  title,
  description,
  tags = [],
  link,
  color = '#6366f1',
  children,
  proximityDistance = 5
}: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [nearby, setNearby] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { camera } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      // Check distance from camera (player)
      const distance = groupRef.current.position.distanceTo(camera.position)
      const isNearby = distance < proximityDistance

      if (isNearby !== nearby) {
        setNearby(isNearby)
        if (!isNearby) setShowInfo(false)
      }
    }
  })

  const handleClick = () => {
    if (nearby) {
      if (link) {
        window.open(link, '_blank')
      } else {
        setShowInfo(!showInfo)
      }
    }
  }

  return (
    <group ref={groupRef} position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <group
          onClick={handleClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {children || (
            <DefaultPillar color={color} hovered={hovered} nearby={nearby} />
          )}
        </group>
      </RigidBody>

      {/* Info panel appears above the object */}
      <InfoPanel
        title={title}
        description={description}
        tags={tags}
        link={link}
        color={color}
        position={[0, 3.5, 0]}
        visible={nearby || showInfo}
      />

      {/* Proximity glow effect */}
      {nearby && (
        <pointLight
          position={[0, 1, 0]}
          intensity={2}
          distance={5}
          color={color}
        />
      )}
    </group>
  )
}

function DefaultPillar({
  color,
  hovered,
  nearby
}: {
  color: string
  hovered: boolean
  nearby: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation when nearby
      if (nearby) {
        meshRef.current.rotation.y += 0.01
      }

      // Scale effect on hover
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.2, 2, 1.2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={nearby ? 0.4 : 0.1}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  )
}
