"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Activity,
  ArrowLeft,
  Building,
  Package,
  Shield,
  Plus,
  MapPin,
  Trash2,
  Phone,
  Heart,
  Zap,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import WorkerPositions from "@/components/3d/WorkerPositions"
import ConstructionSite from "@/components/3d/ConstructionSite"
import AddWorkerModal from "@/components/dashboard/AddWorkerModal"
import EmergencyAlert from "@/components/dashboard/EmergencyAlert"

export default function PersonnelPage() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "김철수",
      role: "철근공",
      status: "작업중",
      heartRate: 85,
      oxygenSaturation: 98,
      location: "1층 동쪽",
      position: [-5, 1, -3] as [number, number, number],
      workZone: "기초공사",
      isInDanger: false,
    },
    {
      id: 2,
      name: "이영희",
      role: "안전관리자",
      status: "순찰중",
      heartRate: 72,
      oxygenSaturation: 99,
      location: "현장 전체",
      position: [3, 1, 2] as [number, number, number],
      workZone: "안전관리",
      isInDanger: false,
    },
    {
      id: 3,
      name: "박민수",
      role: "용접공",
      status: "작업중",
      heartRate: 92,
      oxygenSaturation: 97,
      location: "2층 서쪽",
      position: [-8, 1, 5] as [number, number, number],
      workZone: "골조공사",
      isInDanger: false,
    },
    {
      id: 4,
      name: "정수진",
      role: "현장관리자",
      status: "회의중",
      heartRate: 78,
      oxygenSaturation: 98,
      location: "사무실",
      position: [7, 1, -2] as [number, number, number],
      workZone: "관리업무",
      isInDanger: false,
    },
    {
      id: 5,
      name: "최동호",
      role: "크레인기사",
      status: "고소작업",
      heartRate: 95,
      oxygenSaturation: 96,
      location: "크레인",
      position: [0, 5, 0] as [number, number, number],
      workZone: "중장비",
      isInDanger: false,
    },
  ])

  const [isAddingWorker, setIsAddingWorker] = useState(false)
  const [isAssigningPosition, setIsAssigningPosition] = useState(false)
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null)
  const [emergencyWorker, setEmergencyWorker] = useState<any>(null)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)

  const addWorker = (newWorker: any) => {
    const worker = {
      ...newWorker,
      id: Math.max(...workers.map((w) => w.id)) + 1,
      position: [0, 1, 0] as [number, number, number],
      location: "대기 구역",
      status: "대기중", // 새 작업자는 기본적으로 대기중 상태
      heartRate: Math.floor(Math.random() * 30) + 70,
      oxygenSaturation: Math.floor(Math.random() * 3) + 97,
      isInDanger: false,
    }
    setWorkers([...workers, worker])
    setIsAddingWorker(false)
  }

  const removeWorker = (workerId: number) => {
    setWorkers(workers.filter((w) => w.id !== workerId))
  }

  const updateWorkerPosition = (workerId: number, position: [number, number, number]) => {
    setWorkers(
      workers.map((w) =>
        w.id === workerId
          ? {
              ...w,
              position,
              location: `위치 (${position[0].toFixed(1)}, ${position[2].toFixed(1)})`,
              // 위치가 기본 대기 위치 [0, 1, 0]이 아니면 작업중으로 변경
              status: position[0] === 0 && position[1] === 1 && position[2] === 0 ? "대기중" : "작업중",
            }
          : w,
      ),
    )
    setIsAssigningPosition(false)
    setSelectedWorkerId(null)
  }

  const handlePositionClick = (position: [number, number, number]) => {
    if (selectedWorkerId) {
      updateWorkerPosition(selectedWorkerId, position)
    }
  }

  const startPositionAssignment = (workerId: number) => {
    setSelectedWorkerId(workerId)
    setIsAssigningPosition(true)
  }

  const cancelPositionAssignment = () => {
    setIsAssigningPosition(false)
    setSelectedWorkerId(null)
  }

  const handleWorkerUpdate = (updatedWorkers: any[]) => {
    setWorkers(updatedWorkers)
  }

  const handleWorkerDangerChange = (workerId: number, isInDanger: boolean) => {
    const worker = workers.find((w) => w.id === workerId)
    if (worker && isInDanger) {
      setEmergencyWorker(worker)
      setShowEmergencyAlert(true)
    }
  }

  const handleIndividualEmergencyCall = (worker: any) => {
    alert(`${worker.name}에 대한 119 신고가 접수되었습니다. 구급대가 출동합니다.`)
  }

  const handleEmergencyCall = () => {
    alert("119에 신고되었습니다. 구급대가 출동합니다.")
    setShowEmergencyAlert(false)
  }

  // 통계 계산
  const workingWorkers = workers.filter((w) => w.status === "작업중").length
  const waitingWorkers = workers.filter((w) => w.status === "대기중").length
  const dangerousWorkers = workers.filter((w) => w.isInDanger).length
  const averageHeartRate = Math.round(workers.reduce((sum, w) => sum + w.heartRate, 0) / workers.length)
  const averageOxygenSaturation = Math.round(workers.reduce((sum, w) => sum + w.oxygenSaturation, 0) / workers.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background overlay to ensure full coverage */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 -z-10"></div>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4 sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                메인으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">인력 관리 센터</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAssigningPosition && (
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">위치 지정 모드</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelPositionAssignment}
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  취소
                </Button>
              </div>
            )}
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="w-3 h-3 mr-1" />
              실시간 연결됨
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 pb-12">
        {/* 상단 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{workers.length}</div>
                  <div className="text-sm text-white/70">총 인원</div>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-400">{workingWorkers}</div>
                  <div className="text-sm text-white/70">작업 중</div>
                </div>
                <Zap className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{waitingWorkers}</div>
                  <div className="text-sm text-white/70">대기 중</div>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-400">{dangerousWorkers}</div>
                  <div className="text-sm text-white/70">위험 상태</div>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-400">{averageHeartRate}</div>
                  <div className="text-sm text-white/70">평균 심박수</div>
                </div>
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D 뷰어 */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-md bg-white/5 border-white/10 h-[600px]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    3D 인력 배치 뷰
                  </div>
                  {isAssigningPosition && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      지면을 클릭하여 위치 지정
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [30, 20, 30], fov: 60 }}>
                    <Suspense fallback={null}>
                      <Environment preset="sunset" />
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />

                      <ConstructionSite
                        onPositionClick={handlePositionClick}
                        isAssigningPosition={isAssigningPosition}
                        clickedPositions={workers.map((w) => w.position)}
                      />

                      <WorkerPositions
                        workers={workers}
                        onWorkerDangerChange={handleWorkerDangerChange}
                        onWorkerUpdate={handleWorkerUpdate}
                      />

                      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    </Suspense>
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            {/* 현장 인력 현황 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">현장 인력 현황</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setIsAddingWorker(true)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {workers.map((worker) => (
                  <div
                    key={worker.id}
                    className={`p-3 rounded-lg ${
                      worker.isInDanger
                        ? "bg-red-500/10 border-red-500/30 border-2"
                        : "bg-white/5 border-white/10 border"
                    } hover:bg-white/10 transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{worker.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            worker.status === "작업중"
                              ? "bg-green-500/20 text-green-400"
                              : worker.status === "대기중"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : worker.status === "휴식"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-orange-500/20 text-orange-400"
                          }
                        >
                          {worker.status}
                        </Badge>
                        {worker.isInDanger && <Badge className="bg-red-500/20 text-red-400 animate-pulse">위험</Badge>}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeWorker(worker.id)
                          }}
                          className="text-red-400 hover:bg-red-500/20 p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-white/70 mb-1">{worker.role}</div>
                    <div className="text-xs text-blue-300 mb-2">{worker.workZone}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="flex items-center">
                        <span className="text-white/60 mr-2">위치:</span>
                        <span className="text-white">{worker.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`${worker.isInDanger ? "text-red-400 font-bold" : "text-red-300"} mr-1`}>
                          ♥
                        </span>
                        <span className={`${worker.isInDanger ? "text-red-400 font-bold" : "text-white"}`}>
                          {worker.heartRate}bpm
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white/60 mr-2">상태:</span>
                        <span className="text-white">{worker.status}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`${worker.isInDanger ? "text-red-400 font-bold" : "text-blue-300"} mr-1`}>
                          🫁
                        </span>
                        <span className={`${worker.isInDanger ? "text-red-400 font-bold" : "text-white"}`}>
                          {worker.oxygenSaturation}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 pt-2 border-t border-white/10">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          startPositionAssignment(worker.id)
                        }}
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent text-xs"
                        disabled={isAssigningPosition}
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {worker.status === "대기중" ? "배치하기" : "위치 변경"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleIndividualEmergencyCall(worker)
                        }}
                        className={`flex-1 text-xs ${
                          worker.isInDanger
                            ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                            : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                        }`}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        119 신고
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 생체신호 모니터링 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  생체신호 모니터링
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-purple-400">{averageHeartRate} bpm</div>
                    <div className="text-sm text-white/70">평균 심박수</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-blue-400">{averageOxygenSaturation}%</div>
                    <div className="text-sm text-white/70">평균 산소포화도</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">정상 범위 인원</span>
                    <span className="text-green-400 font-semibold">{workers.length - dangerousWorkers}명</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">주의 필요 인원</span>
                    <span className="text-red-400 font-semibold">{dangerousWorkers}명</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 실시간 알림 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">실시간 알림</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center text-green-400 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    안전 점검 완료 - 1층 동쪽
                  </div>
                  <div className="text-xs text-white/60 mt-1">2분 전</div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Package className="w-4 h-4 mr-2" />
                    철근 자재 부족 예상
                  </div>
                  <div className="text-xs text-white/60 mt-1">5분 전</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center text-blue-400 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    새로운 작업자 출근
                  </div>
                  <div className="text-xs text-white/60 mt-1">10분 전</div>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 액션 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">빠른 액션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard">
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    통합 대시보드
                  </Button>
                </Link>
                <Link href="/personnel">
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    인력 관리
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    현장 공정 관리
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 하단 추가 정보 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* 작업 구역별 현황 */}
          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">작업 구역별 현황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                // 실제 workers에서 workZone 추출 및 통계 계산
                const zoneStats = workers.reduce(
                  (acc, worker) => {
                    const zone = worker.workZone
                    if (!acc[zone]) {
                      acc[zone] = { total: 0, danger: 0 }
                    }
                    acc[zone].total += 1
                    if (worker.isInDanger) {
                      acc[zone].danger += 1
                    }
                    return acc
                  },
                  {} as Record<string, { total: number; danger: number }>,
                )

                // 구역이 없으면 기본 메시지 표시
                if (Object.keys(zoneStats).length === 0) {
                  return <div className="p-4 text-center text-white/60">배치된 작업자가 없습니다.</div>
                }

                return Object.entries(zoneStats).map(([zone, stats]) => (
                  <div key={zone} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{zone}</span>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-500/20 text-blue-400">{stats.total}명</Badge>
                        {stats.danger > 0 && (
                          <Badge className="bg-red-500/20 text-red-400">위험 {stats.danger}명</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="text-white/60">안전 상태</span>
                      <span className="text-white/60">
                        {stats.total - stats.danger}/{stats.total}명
                      </span>
                    </div>
                    <Progress
                      value={stats.total > 0 ? ((stats.total - stats.danger) / stats.total) * 100 : 100}
                      className="h-2 bg-white/10"
                    />
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-green-400">정상: {stats.total - stats.danger}명</span>
                      {stats.danger > 0 && <span className="text-red-400">위험: {stats.danger}명</span>}
                    </div>
                  </div>
                ))
              })()}
            </CardContent>
          </Card>

          {/* 시간대별 활동 */}
          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                오늘의 활동 요약
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70 text-sm">08:00 - 출근 완료</span>
                  <span className="text-green-400 text-sm">{workers.length}명</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70 text-sm">09:00 - 안전 교육</span>
                  <span className="text-blue-400 text-sm">완료</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70 text-sm">12:00 - 점심 휴식</span>
                  <span className="text-orange-400 text-sm">예정</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70 text-sm">18:00 - 작업 종료</span>
                  <span className="text-gray-400 text-sm">예정</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 작업자 추가 모달 */}
      <AddWorkerModal isOpen={isAddingWorker} onClose={() => setIsAddingWorker(false)} onAdd={addWorker} />
      {showEmergencyAlert && emergencyWorker && (
        <EmergencyAlert
          worker={emergencyWorker}
          onClose={() => setShowEmergencyAlert(false)}
          onEmergencyCall={handleEmergencyCall}
        />
      )}
    </div>
  )
}
