import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Text, Float, Billboard } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import * as THREE from 'three'
import { portfolioData } from '../data/portfolio'

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Zone accent lights */}
      <pointLight position={[0, 5, 0]} intensity={2} color="#8b5cf6" distance={25} />
      <pointLight position={[20, 5, 0]} intensity={1.5} color="#06b6d4" distance={20} />
      <pointLight position={[-20, 5, 0]} intensity={1.5} color="#10b981" distance={20} />
      <pointLight position={[0, 5, 20]} intensity={1.5} color="#f59e0b" distance={20} />

      {/* Ground with physics */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[120, 120, 1]} />
          <meshStandardMaterial color="#0f0f1a" />
        </mesh>
      </RigidBody>

      {/* Grid overlay */}
      <gridHelper args={[120, 60, '#1a1a3a', '#0f0f2a']} position={[0, 0.01, 0]} />

      {/* Zone markers */}
      <ZoneMarker position={[0, 0.02, 0]} color="#8b5cf6" />
      <ZoneMarker position={[20, 0.02, 0]} color="#06b6d4" />
      <ZoneMarker position={[-20, 0.02, 0]} color="#10b981" />
      <ZoneMarker position={[0, 0.02, 20]} color="#f59e0b" />

      {/* Character */}
      <Ecctrl
        capsuleRadius={0.35}
        capsuleHalfHeight={0.45}
        floatHeight={0.3}
        camInitDis={-8}
        camMaxDis={-12}
        camMinDis={-5}
        maxVelLimit={5}
        sprintMult={2}
        jumpVel={6}
        position={[0, 5, 5]}
        mode="FixedCamera"
      >
        <group>
          <mesh castShadow>
            <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
            <meshStandardMaterial color="#6366f1" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0.1, 0.3, 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[-0.1, 0.3, 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <pointLight intensity={1} distance={4} color="#6366f1" />
        </group>
      </Ecctrl>

      {/* === ABOUT ZONE (Center) === */}
      <group position={[0, 0, -5]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Billboard>
            <Text position={[0, 4, 0]} fontSize={1.2} color="white" anchorX="center">
              {portfolioData.name}
            </Text>
            <Text position={[0, 2.8, 0]} fontSize={0.5} color="#8b5cf6" anchorX="center">
              {portfolioData.title}
            </Text>
            <Text
              position={[0, 1.5, 0]}
              fontSize={0.2}
              color="#a1a1aa"
              anchorX="center"
              maxWidth={8}
              textAlign="center"
            >
              {portfolioData.about}
            </Text>
          </Billboard>
        </Float>
      </group>

      {/* === PROJECTS ZONE (East +X) === */}
      <group position={[20, 0, 0]}>
        <Float speed={1.5} floatIntensity={0.2}>
          <Billboard>
            <Text position={[0, 5, 0]} fontSize={0.8} color="#06b6d4" anchorX="center">
              Projects
            </Text>
          </Billboard>
        </Float>
        {portfolioData.projects.map((project, i) => (
          <ProjectPillar
            key={project.id}
            project={project}
            position={[
              Math.cos((i / portfolioData.projects.length) * Math.PI * 2) * 6,
              0,
              Math.sin((i / portfolioData.projects.length) * Math.PI * 2) * 6
            ]}
          />
        ))}
      </group>

      {/* === SKILLS ZONE (West -X) === */}
      <group position={[-20, 0, 0]}>
        <Float speed={1.5} floatIntensity={0.2}>
          <Billboard>
            <Text position={[0, 5, 0]} fontSize={0.8} color="#10b981" anchorX="center">
              Skills
            </Text>
          </Billboard>
        </Float>
        {portfolioData.skills.map((category, i) => (
          <SkillPillar
            key={category.category}
            category={category}
            position={[
              Math.cos((i / portfolioData.skills.length) * Math.PI * 2) * 5,
              0,
              Math.sin((i / portfolioData.skills.length) * Math.PI * 2) * 5
            ]}
          />
        ))}
      </group>

      {/* === CONTACT ZONE (South +Z) === */}
      <group position={[0, 0, 20]}>
        <Float speed={1.5} floatIntensity={0.2}>
          <Billboard>
            <Text position={[0, 5, 0]} fontSize={0.8} color="#f59e0b" anchorX="center">
              Contact
            </Text>
          </Billboard>
        </Float>
        {portfolioData.contact.map((contact, i) => (
          <ContactCard
            key={contact.type}
            contact={contact}
            position={[
              (i - (portfolioData.contact.length - 1) / 2) * 3.5,
              2,
              0
            ]}
          />
        ))}
      </group>
    </>
  )
}

function ZoneMarker({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 5, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function ProjectPillar({ project, position }: { project: typeof portfolioData.projects[0]; position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const ref = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (ref.current) {
      const dist = ref.current.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position)
      if (dist < 8 && !showInfo) setShowInfo(true)
      if (dist > 10 && showInfo) setShowInfo(false)
    }
  })

  return (
    <group ref={ref} position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, 1.5, 0]}
          castShadow
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation()
            if (project.link) window.open(project.link, '_blank')
            else if (project.github) window.open(project.github, '_blank')
          }}
        >
          <boxGeometry args={[1.5, 3, 1.5]} />
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </RigidBody>

      {/* Floating gem on top */}
      <Float speed={3} floatIntensity={0.3}>
        <mesh position={[0, 3.5, 0]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.5} />
        </mesh>
      </Float>

      {/* Info panel */}
      {showInfo && (
        <Billboard position={[0, 5, 0]}>
          <Text position={[0, 0.5, 0]} fontSize={0.3} color="white" anchorX="center">
            {project.title}
          </Text>
          <Text position={[0, 0, 0]} fontSize={0.15} color="#a1a1aa" anchorX="center" maxWidth={4} textAlign="center">
            {project.description}
          </Text>
          <Text position={[0, -0.6, 0]} fontSize={0.12} color={project.color} anchorX="center">
            {project.technologies.join(' • ')}
          </Text>
          {project.link && (
            <Text position={[0, -0.9, 0]} fontSize={0.1} color="#06b6d4" anchorX="center">
              Click pillar to visit →
            </Text>
          )}
        </Billboard>
      )}

      <pointLight position={[0, 2, 0]} intensity={hovered ? 2 : 0.5} distance={5} color={project.color} />
    </group>
  )
}

function SkillPillar({ category, position }: { category: typeof portfolioData.skills[0]; position: [number, number, number] }) {
  const [showInfo, setShowInfo] = useState(false)
  const ref = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (ref.current) {
      const dist = ref.current.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position)
      if (dist < 7 && !showInfo) setShowInfo(true)
      if (dist > 9 && showInfo) setShowInfo(false)
    }
  })

  return (
    <group ref={ref} position={position}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1, 2, 6]} />
          <meshStandardMaterial color={category.color} emissive={category.color} emissiveIntensity={0.2} metalness={0.6} />
        </mesh>
      </RigidBody>

      {showInfo && (
        <Billboard position={[0, 3.5, 0]}>
          <Text position={[0, 0.5, 0]} fontSize={0.35} color={category.color} anchorX="center">
            {category.category}
          </Text>
          {category.items.slice(0, 4).map((item, i) => (
            <Text key={item} position={[0, -i * 0.35, 0]} fontSize={0.18} color="#a1a1aa" anchorX="center">
              {item}
            </Text>
          ))}
          {category.items.length > 4 && (
            <Text position={[0, -4 * 0.35, 0]} fontSize={0.15} color="#666" anchorX="center">
              +{category.items.length - 4} more
            </Text>
          )}
        </Billboard>
      )}

      <pointLight position={[0, 2, 0]} intensity={showInfo ? 1.5 : 0.3} distance={4} color={category.color} />
    </group>
  )
}

function ContactCard({ contact, position }: { contact: typeof portfolioData.contact[0]; position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)

  const colors: Record<string, string> = {
    Email: '#ef4444',
    LinkedIn: '#0077b5',
    GitHub: '#a855f7',
    Website: '#f59e0b'
  }
  const color = colors[contact.type] || '#f59e0b'

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (contact.link) {
      window.open(contact.link, '_blank')
    }
  }

  return (
    <Billboard position={position}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#0a0a0f" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.1, 1.6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.3} transparent opacity={0.5} />
      </mesh>
      <Text position={[0, 0.35, 0.01]} fontSize={0.25} color={color} anchorX="center">
        {contact.type}
      </Text>
      <Text position={[0, -0.1, 0.01]} fontSize={0.18} color="#a1a1aa" anchorX="center">
        {contact.value}
      </Text>
      {contact.link && (
        <Text position={[0, -0.5, 0.01]} fontSize={0.1} color="#6366f1" anchorX="center">
          Click to open
        </Text>
      )}
      <pointLight intensity={hovered ? 1 : 0.3} distance={3} color={color} />
    </Billboard>
  )
}
