"use client"

import { Sphere, Html } from "@react-three/drei"
import { useEffect, useState } from "react"

interface Worker {
  id: number
  name: string
  role: string
  status: string
  heartRate: number
  oxygenSaturation: number
  location: string
  position: [number, number, number]
  workZone: string
  isInDanger: boolean
}

interface WorkerPositionsProps {
  workers: Worker[]
  onWorkerDangerChange?: (workerId: number, isInDanger: boolean) => void
  onWorkerUpdate?: (workers: Worker[]) => void
}

export default function WorkerPositions({ workers, onWorkerDangerChange, onWorkerUpdate }: WorkerPositionsProps) {
  const [localWorkers, setLocalWorkers] = useState(workers)

  useEffect(() => {
    setLocalWorkers(workers)
  }, [workers])

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalWorkers((prevWorkers) => {
        const updatedWorkers = prevWorkers.map((worker) => {
          // 1% 확률로 위험 상태 발생
          const shouldBeDangerous = Math.random() < 0.01

          let newHeartRate = worker.heartRate
          let newOxygenSaturation = worker.oxygenSaturation
          let newIsInDanger = false

          if (shouldBeDangerous && !worker.isInDanger) {
            // 위험 수치로 변경
            newHeartRate =
              Math.random() > 0.5
                ? Math.floor(Math.random() * 20) + 120
                : // 120-140 (빈맥)
                  Math.floor(Math.random() * 10) + 40 // 40-50 (서맥)
            newOxygenSaturation = Math.floor(Math.random() * 5) + 85 // 85-90% (저산소증)
            newIsInDanger = true

            // 위험 상태 알림
            if (onWorkerDangerChange) {
              onWorkerDangerChange(worker.id, true)
            }
          } else if (worker.isInDanger && Math.random() < 0.3) {
            // 30% 확률로 정상 상태로 복귀
            newHeartRate = Math.floor(Math.random() * 30) + 70 // 70-100
            newOxygenSaturation = Math.floor(Math.random() * 3) + 97 // 97-99%
            newIsInDanger = false

            if (onWorkerDangerChange) {
              onWorkerDangerChange(worker.id, false)
            }
          } else if (!worker.isInDanger) {
            // 정상 범위 내에서 소폭 변동
            const heartRateChange = (Math.random() - 0.5) * 6 // ±3
            const oxygenChange = (Math.random() - 0.5) * 2 // ±1

            newHeartRate = Math.max(60, Math.min(100, worker.heartRate + heartRateChange))
            newOxygenSaturation = Math.max(95, Math.min(100, worker.oxygenSaturation + oxygenChange))
          }

          return {
            ...worker,
            heartRate: Math.round(newHeartRate),
            oxygenSaturation: Math.round(newOxygenSaturation),
            isInDanger: newIsInDanger,
          }
        })

        // 부모 컴포넌트에 업데이트된 workers 전달
        if (onWorkerUpdate) {
          onWorkerUpdate(updatedWorkers)
        }

        return updatedWorkers
      })
    }, 1500) // 1.5초마다 업데이트

    return () => clearInterval(interval)
  }, [onWorkerDangerChange, onWorkerUpdate])

  return (
    <group>
      {localWorkers.map((worker) => (
        <group key={worker.id} position={worker.position}>
          {/* 작업자 위치 표시 구체 */}
          <Sphere args={[0.5]}>
            <meshStandardMaterial
              color={worker.isInDanger ? "#FF0000" : "#4CAF50"}
              emissive={worker.isInDanger ? "#FF0000" : "#4CAF50"}
              emissiveIntensity={worker.isInDanger ? 0.3 : 0.1}
            />
          </Sphere>

          {/* 위험 상태일 때 경고 효과 */}
          {worker.isInDanger && (
            <Sphere args={[0.8]}>
              <meshStandardMaterial
                color="#FF0000"
                transparent
                opacity={0.3}
                emissive="#FF0000"
                emissiveIntensity={0.5}
              />
            </Sphere>
          )}

          {/* 정보 표시 HTML */}
          <Html distanceFactor={10}>
            <div
              className={`p-2 rounded text-xs whitespace-nowrap ${
                worker.isInDanger ? "bg-red-900/90 text-white border border-red-500" : "bg-black/80 text-white"
              }`}
            >
              <div className="font-semibold">{worker.name}</div>
              <div className="text-xs opacity-80">{worker.role}</div>
              <div className="text-xs text-blue-300">{worker.workZone}</div>
              <div className="text-xs opacity-80">{worker.status}</div>
              <div className={`text-xs ${worker.isInDanger ? "text-red-300 font-bold" : "text-red-300"}`}>
                ♥ {worker.heartRate}bpm
              </div>
              <div className={`text-xs ${worker.isInDanger ? "text-red-300 font-bold" : "text-blue-300"}`}>
                🫁 {worker.oxygenSaturation}%
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}
