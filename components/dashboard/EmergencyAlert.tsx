"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, X, Heart, Activity } from "lucide-react"

interface EmergencyAlertProps {
  worker: {
    id: number
    name: string
    role: string
    heartRate: number
    oxygenSaturation: number
    workZone: string
  }
  onClose: () => void
  onEmergencyCall: () => void
}

export default function EmergencyAlert({ worker, onClose, onEmergencyCall }: EmergencyAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const getDangerType = () => {
    if (worker.heartRate > 120) return "빈맥 (심박수 과다)"
    if (worker.heartRate < 50) return "서맥 (심박수 부족)"
    if (worker.oxygenSaturation < 90) return "저산소증"
    return "생체신호 이상"
  }

  const getActionSteps = () => {
    if (worker.heartRate > 120) {
      return [
        "1. 즉시 작업 중단 및 안전한 곳으로 이동",
        "2. 충분한 휴식 및 수분 섭취",
        "3. 심박수가 정상화될 때까지 대기",
        "4. 지속될 경우 의료진 호출",
      ]
    }
    if (worker.heartRate < 50) {
      return ["1. 즉시 작업 중단", "2. 의식 상태 확인", "3. 응급처치 준비", "4. 즉시 119 신고"]
    }
    if (worker.oxygenSaturation < 90) {
      return [
        "1. 즉시 작업 중단 및 환기가 좋은 곳으로 이동",
        "2. 호흡 상태 확인",
        "3. 산소 공급 준비",
        "4. 의료진 즉시 호출",
      ]
    }
    return ["1. 즉시 작업 중단", "2. 안전한 곳으로 이동", "3. 생체신호 재확인", "4. 필요시 의료진 호출"]
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-red-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-red-900/90 border-red-500 max-w-md w-full mx-4 animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mr-3 animate-bounce" />
              <div>
                <h2 className="text-xl font-bold text-white">긴급 상황 발생!</h2>
                <Badge className="bg-red-500/30 text-red-300 mt-1">{getDangerType()}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-4 p-3 bg-red-800/50 rounded-lg">
            <div className="text-white font-semibold mb-2">작업자 정보</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-red-300">이름:</span>
                <div className="text-white font-semibold">{worker.name}</div>
              </div>
              <div>
                <span className="text-red-300">직책:</span>
                <div className="text-white">{worker.role}</div>
              </div>
              <div>
                <span className="text-red-300">작업구역:</span>
                <div className="text-white">{worker.workZone}</div>
              </div>
              <div>
                <span className="text-red-300">현재 상태:</span>
                <div className="text-red-300 font-bold">위험</div>
              </div>
            </div>
          </div>

          <div className="mb-4 p-3 bg-red-800/50 rounded-lg">
            <div className="text-white font-semibold mb-2">생체신호</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-red-400 mr-2" />
                <div>
                  <div className="text-red-300 text-xs">심박수</div>
                  <div className="text-white font-bold">{worker.heartRate} bpm</div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-red-400 mr-2" />
                <div>
                  <div className="text-red-300 text-xs">산소포화도</div>
                  <div className="text-white font-bold">{worker.oxygenSaturation}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 p-3 bg-yellow-900/30 rounded-lg">
            <div className="text-yellow-300 font-semibold mb-2">조치 방법</div>
            <div className="space-y-1">
              {getActionSteps().map((step, index) => (
                <div key={index} className="text-yellow-100 text-sm">
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onEmergencyCall} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              <Phone className="w-4 h-4 mr-2" />
              119 신고
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-red-500 text-red-300 hover:bg-red-500/20 bg-transparent"
            >
              확인
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
