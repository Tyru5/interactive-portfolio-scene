import { Text, Float } from '@react-three/drei'
import InteractiveObject from '../Interactive/InteractiveObject'
import { portfolioData } from '../../data/portfolio'

export default function ProjectsZone() {
  return (
    <group position={[25, 0, 0]}>
      {/* Zone title */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <group position={[0, 4, 0]}>
          <Text
            fontSize={0.6}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Projects
          </Text>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[3, 0.03, 0.03]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Project pillars arranged in a semi-circle */}
      {portfolioData.projects.map((project, index) => {
        // Arrange projects in an arc
        const angle = (index / (portfolioData.projects.length - 1)) * Math.PI - Math.PI / 2
        const radius = 6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <InteractiveObject
            key={project.id}
            position={[x, 1, z]}
            title={project.title}
            description={project.description}
            tags={project.technologies}
            link={project.link || project.github}
            color={project.color}
          >
            <ProjectPillar color={project.color} height={2 + index * 0.2} />
          </InteractiveObject>
        )
      })}

      {/* Decorative platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[10, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function ProjectPillar({ color, height }: { color: string; height: number }) {
  return (
    <group>
      {/* Main pillar */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Top decoration */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 1, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
      </mesh>
    </group>
  )
}
