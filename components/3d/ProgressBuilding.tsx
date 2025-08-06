"use client"

import { Box, Html } from "@react-three/drei"
import { useState } from "react"

interface BuildingSection {
  id: string
  name: string
  position: [number, number, number]
  size: [number, number, number]
  progress: number
  color: string
}

interface ProgressBuildingProps {
  sections: BuildingSection[]
}

export default function ProgressBuilding({ sections }: ProgressBuildingProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  return (
    <group>
      {/* 기초 바닥 */}
      <Box args={[25, 0.5, 20]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#8B7355" />
      </Box>

      {/* 건물 섹션들 */}
      {sections.map((section) => (
        <group key={section.id}>
          <Box
            args={section.size}
            position={section.position}
            onPointerEnter={() => setHoveredSection(section.id)}
            onPointerLeave={() => setHoveredSection(null)}
          >
            <meshStandardMaterial
              color={section.color}
              transparent
              opacity={section.progress / 100}
              emissive={section.color}
              emissiveIntensity={section.progress > 0 ? 0.1 : 0}
            />
          </Box>

          {/* 진행률 표시 */}
          {(hoveredSection === section.id || section.progress > 0) && (
            <Html
              position={[section.position[0], section.position[1] + section.size[1] / 2 + 1, section.position[2]]}
              distanceFactor={15}
            >
              <div className="bg-black/80 text-white p-2 rounded text-xs whitespace-nowrap text-center">
                <div className="font-semibold">{section.name}</div>
                <div className="text-xs opacity-80">{section.progress}% 완료</div>
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* 크레인 */}
      <group position={[15, 0, 10]}>
        <Box args={[1, 25, 1]} position={[0, 12.5, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Box>
        <Box args={[20, 0.5, 0.5]} position={[-10, 20, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Box>
      </group>

      {/* 조명 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </group>
  )
}
