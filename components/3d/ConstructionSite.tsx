"use client"

import { Box, Html } from "@react-three/drei"
import { useState } from "react"
import type { ThreeEvent } from "@react-three/fiber"

interface ConstructionSiteProps {
  onPositionClick?: (position: [number, number, number]) => void
  isAssigningPosition?: boolean
  clickedPositions?: [number, number, number][]
}

export default function ConstructionSite({
  onPositionClick,
  isAssigningPosition,
  clickedPositions = [],
}: ConstructionSiteProps) {
  const [hoveredPosition, setHoveredPosition] = useState<[number, number, number] | null>(null)

  const handleGroundClick = (event: ThreeEvent<MouseEvent>) => {
    if (isAssigningPosition && onPositionClick) {
      event.stopPropagation()
      const point = event.point
      const position: [number, number, number] = [point.x, 1, point.z] // Y를 1로 고정 (지면 위)
      onPositionClick(position)
    }
  }

  const handleGroundHover = (event: ThreeEvent<MouseEvent>) => {
    if (isAssigningPosition) {
      const point = event.point
      setHoveredPosition([point.x, 1, point.z])
    }
  }

  return (
    <group>
      {/* 건물 기초 */}
      <Box args={[20, 1, 15]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8B7355" />
      </Box>

      {/* 건물 골조 */}
      <Box args={[18, 8, 13]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#A0A0A0" transparent opacity={0.7} />
      </Box>

      {/* 크레인 */}
      <group position={[15, 0, 10]}>
        <Box args={[1, 25, 1]} position={[0, 12.5, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Box>
        <Box args={[20, 0.5, 0.5]} position={[-10, 20, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Box>
      </group>

      {/* 클릭 가능한 작업 구역 (위치 지정용) */}
      <Box
        args={[25, 0.1, 20]}
        position={[0, 0.1, 0]}
        onClick={handleGroundClick}
        onPointerMove={handleGroundHover}
        onPointerLeave={() => setHoveredPosition(null)}
      >
        <meshStandardMaterial
          color={isAssigningPosition ? "#FF6B6B" : "#4A90E2"}
          transparent
          opacity={isAssigningPosition ? 0.5 : 0.3}
        />
      </Box>

      {/* 클릭된 위치들에 빨간 점 표시 */}
      {clickedPositions.map((position, index) => (
        <group key={index} position={position}>
          <Box args={[0.3, 0.3, 0.3]}>
            <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
          </Box>
          <Html distanceFactor={10}>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">지정된 위치</div>
          </Html>
        </group>
      ))}

      {/* 호버된 위치 미리보기 */}
      {hoveredPosition && isAssigningPosition && (
        <group position={hoveredPosition}>
          <Box args={[0.2, 0.2, 0.2]}>
            <meshStandardMaterial color="#FFFF00" transparent opacity={0.7} />
          </Box>
        </group>
      )}

      {/* 작업 구역 라벨 */}
      <Html position={[-8, 2, -6]} distanceFactor={15}>
        <div className="bg-brown-600 text-white p-2 rounded text-xs">🏗️ 기초공사 구역</div>
      </Html>

      <Html position={[8, 6, 0]} distanceFactor={15}>
        <div className="bg-gray-600 text-white p-2 rounded text-xs">🏢 골조공사 구역</div>
      </Html>

      <Html position={[15, 15, 10]} distanceFactor={15}>
        <div className="bg-yellow-600 text-white p-2 rounded text-xs">🏗️ 중장비 구역</div>
      </Html>
    </group>
  )
}
