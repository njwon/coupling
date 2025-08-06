"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building, Activity, Users, Package, Shield, Settings } from "lucide-react"
import Link from "next/link"
import WorkerPositions from "@/components/3d/WorkerPositions"
import ConstructionSite from "@/components/3d/ConstructionSite"

export default function ViewerPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const workers = [
    {
      id: 1,
      name: "김철수",
      role: "철근공",
      status: "작업중",
      heartRate: 85,
      location: "1층 동쪽",
      position: [-5, 1, -3] as [number, number, number],
      workZone: "기초공사",
    },
    {
      id: 2,
      name: "이영희",
      role: "안전관리자",
      status: "순찰중",
      heartRate: 72,
      location: "현장 전체",
      position: [3, 1, 2] as [number, number, number],
      workZone: "안전관리",
    },
    {
      id: 3,
      name: "박민수",
      role: "용접공",
      status: "작업중",
      heartRate: 92,
      location: "2층 서쪽",
      position: [-8, 1, 5] as [number, number, number],
      workZone: "골조공사",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">3D 뷰어</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="w-3 h-3 mr-1" />
              실시간 연결됨
            </Badge>
            <Link href="/dashboard">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                통합 대시보드
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* 3D 뷰어 */}
          <div className="lg:col-span-3">
            <Card className="h-full backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  실시간 3D 현장 뷰
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [30, 20, 30], fov: 60 }}>
                    <Suspense fallback={null}>
                      <Environment preset="sunset" />
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />

                      <ConstructionSite clickedPositions={workers.map((w) => w.position)} />
                      <WorkerPositions workers={workers} />

                      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    </Suspense>
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TAB UI 사이드 패널 */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20 text-xs">
                  현황
                </TabsTrigger>
                <TabsTrigger value="control" className="text-white data-[state=active]:bg-white/20 text-xs">
                  제어
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* 현장 개요 */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">현장 개요</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">총 인원</span>
                      <span className="text-white font-semibold">{workers.length}명</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">작업 중</span>
                      <span className="text-green-400 font-semibold">
                        {workers.filter((w) => w.status === "작업중").length}명
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">안전 상태</span>
                      <Badge className="bg-green-500/20 text-green-400 text-xs">양호</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 작업자 목록 */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">작업자 현황</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                    {workers.map((worker) => (
                      <div key={worker.id} className="p-2 rounded bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{worker.name}</span>
                          <Badge
                            className={
                              worker.status === "작업중"
                                ? "bg-green-500/20 text-green-400 text-xs"
                                : "bg-blue-500/20 text-blue-400 text-xs"
                            }
                          >
                            {worker.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-white/60">{worker.role}</div>
                        <div className="text-xs text-blue-300">{worker.workZone}</div>
                        <div className="text-xs text-red-300">♥ {worker.heartRate}bpm</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="control" className="space-y-4">
                {/* 제어 패널 */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">뷰어 제어</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                      <Users className="w-4 h-4 mr-2" />
                      인력 관리
                    </Button>
                    <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                      <Package className="w-4 h-4 mr-2" />
                      자재 관리
                    </Button>
                    <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                      <Shield className="w-4 h-4 mr-2" />
                      안전 점검
                    </Button>
                    <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                      <Settings className="w-4 h-4 mr-2" />
                      설정
                    </Button>
                  </CardContent>
                </Card>

                {/* 빠른 액션 */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">빠른 액션</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/safety">
                      <Button
                        size="sm"
                        className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
                      >
                        안전 관리로 이동
                      </Button>
                    </Link>
                    <Link href="/personnel">
                      <Button
                        size="sm"
                        className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30"
                      >
                        인력 센터로 이동
                      </Button>
                    </Link>
                    <Link href="/emergency">
                      <Button
                        size="sm"
                        className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                      >
                        긴급 대응 센터
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
