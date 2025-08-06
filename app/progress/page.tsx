"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Calendar,
  Building,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Package,
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import ProgressBuilding from "@/components/3d/ProgressBuilding"

export default function ProgressPage() {
  // 건물 섹션별 진행률 데이터
  const buildingSections = [
    {
      id: "foundation",
      name: "기초공사",
      position: [0, 1, 0] as [number, number, number],
      size: [20, 2, 15] as [number, number, number],
      progress: 100,
      color: "#8B4513",
    },
    {
      id: "floor1",
      name: "1층 골조",
      position: [0, 4, 0] as [number, number, number],
      size: [18, 3, 13] as [number, number, number],
      progress: 85,
      color: "#A0A0A0",
    },
    {
      id: "floor2",
      name: "2층 골조",
      position: [0, 7.5, 0] as [number, number, number],
      size: [18, 3, 13] as [number, number, number],
      progress: 60,
      color: "#A0A0A0",
    },
    {
      id: "floor3",
      name: "3층 골조",
      position: [0, 11, 0] as [number, number, number],
      size: [18, 3, 13] as [number, number, number],
      progress: 30,
      color: "#A0A0A0",
    },
    {
      id: "roof",
      name: "지붕",
      position: [0, 14.5, 0] as [number, number, number],
      size: [18, 1, 13] as [number, number, number],
      progress: 0,
      color: "#654321",
    },
  ]

  // 예산 데이터
  const budgetData = {
    total: 5000000000, // 50억
    used: 3350000000, // 33.5억
    remaining: 1650000000, // 16.5억
    categories: [
      { name: "인건비", budget: 2000000000, used: 1340000000, color: "blue" },
      { name: "자재비", budget: 1500000000, used: 1200000000, color: "green" },
      { name: "장비비", budget: 800000000, used: 520000000, color: "purple" },
      { name: "기타", budget: 700000000, used: 290000000, color: "orange" },
    ],
  }

  // 일일 업무 일지
  const dailyTasks = [
    {
      id: 1,
      category: "자재관리",
      task: "철근 50톤 입고 확인",
      status: "완료",
      time: "09:30",
      responsible: "김철수",
      priority: "높음",
    },
    {
      id: 2,
      category: "품질관리",
      task: "1층 콘크리트 강도 검사",
      status: "진행중",
      time: "10:00",
      responsible: "이영희",
      priority: "높음",
    },
    {
      id: 3,
      category: "안전관리",
      task: "크레인 일일 점검",
      status: "완료",
      time: "08:00",
      responsible: "박민수",
      priority: "보통",
    },
    {
      id: 4,
      category: "자재관리",
      task: "시멘트 재고 확인",
      status: "대기",
      time: "14:00",
      responsible: "정수진",
      priority: "보통",
    },
    {
      id: 5,
      category: "업무관리",
      task: "주간 진행 보고서 작성",
      status: "진행중",
      time: "15:30",
      responsible: "최동호",
      priority: "낮음",
    },
    {
      id: 6,
      category: "장비관리",
      task: "굴삭기 정기 점검",
      status: "예정",
      time: "16:00",
      responsible: "김철수",
      priority: "보통",
    },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`
    }
    return `${amount.toLocaleString()}원`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료":
        return "bg-green-500/20 text-green-400"
      case "진행중":
        return "bg-blue-500/20 text-blue-400"
      case "대기":
        return "bg-yellow-500/20 text-yellow-400"
      case "예정":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "높음":
        return "bg-red-500/20 text-red-400"
      case "보통":
        return "bg-yellow-500/20 text-yellow-400"
      case "낮음":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "자재관리":
        return Package
      case "품질관리":
        return CheckCircle
      case "안전관리":
        return AlertTriangle
      case "업무관리":
        return FileText
      case "장비관리":
        return Wrench
      default:
        return Clock
    }
  }

  // 전체 진행률 계산
  const overallProgress = Math.round(
    buildingSections.reduce((sum, section) => sum + section.progress, 0) / buildingSections.length,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background overlay */}
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
            <h1 className="text-2xl font-bold text-white">현장 공정 관리</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Calendar className="w-3 h-3 mr-1" />
              진행률 {overallProgress}%
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Building className="w-3 h-3 mr-1" />
              정상 진행
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 왼쪽: 예산 지표 */}
          <div className="space-y-6">
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  예산 지표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 총 예산 개요 */}
                <div className="space-y-3">
                  <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400">{formatCurrency(budgetData.total)}</div>
                    <div className="text-sm text-white/70">총 예산</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="text-2xl font-bold text-red-400">{formatCurrency(budgetData.used)}</div>
                    <div className="text-sm text-white/70">사용 예산</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(budgetData.remaining)}</div>
                    <div className="text-sm text-white/70">잔여 예산</div>
                  </div>
                </div>

                {/* 카테고리별 예산 */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-sm">카테고리별 사용률</h3>
                  {budgetData.categories.map((category, index) => {
                    const percentage = Math.round((category.used / category.budget) * 100)
                    return (
                      <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">{category.name}</span>
                          <span className="text-white/70 text-xs">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2 bg-white/10" />
                        <div className="text-xs text-white/60 mt-1">
                          {formatCurrency(category.used)} / {formatCurrency(category.budget)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 예산 트렌드 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  예산 트렌드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-green-500/10">
                  <span className="text-white/70 text-sm">이번 주</span>
                  <div className="flex items-center text-green-400">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span className="text-sm">-5.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-500/10">
                  <span className="text-white/70 text-sm">이번 달</span>
                  <div className="flex items-center text-blue-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+2.1%</span>
                  </div>
                </div>
                <div className="text-xs text-white/60 mt-2">* 계획 대비 실제 사용률</div>
              </CardContent>
            </Card>
          </div>

          {/* 중간: 3D 모델 + 진행 수치 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D 건물 모델 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    3D 공정 진행 현황
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">전체 {overallProgress}% 완료</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [30, 20, 30], fov: 60 }}>
                    <Suspense fallback={null}>
                      <Environment preset="sunset" />
                      <ProgressBuilding sections={buildingSections} />
                      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    </Suspense>
                  </Canvas>
                </div>
              </CardContent>
            </Card>

            {/* 진행 수치 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  공정별 진행 수치
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {buildingSections.map((section) => (
                    <div key={section.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{section.name}</h3>
                        <Badge
                          className={
                            section.progress === 100
                              ? "bg-green-500/20 text-green-400"
                              : section.progress > 50
                                ? "bg-blue-500/20 text-blue-400"
                                : section.progress > 0
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                          }
                        >
                          {section.progress}%
                        </Badge>
                      </div>
                      <Progress value={section.progress} className="h-3 bg-white/10" />
                      <div className="text-xs text-white/60 mt-2">
                        {section.progress === 100 ? "완료" : section.progress > 0 ? "진행중" : "대기중"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 일일 업무 일지 */}
          <div className="space-y-6">
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  일일 업무 일지
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {dailyTasks.map((task) => {
                  const IconComponent = getCategoryIcon(task.category)
                  return (
                    <div key={task.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="text-white text-sm font-medium">{task.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)} style={{ fontSize: "10px" }}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)} style={{ fontSize: "10px" }}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-white text-sm mb-2">{task.task}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">담당: {task.responsible}</span>
                        <span className="text-blue-300">{task.time}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* 업무 통계 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">오늘의 업무 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <div className="text-lg font-bold text-green-400">
                      {dailyTasks.filter((t) => t.status === "완료").length}
                    </div>
                    <div className="text-xs text-white/70">완료</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-500/10">
                    <div className="text-lg font-bold text-blue-400">
                      {dailyTasks.filter((t) => t.status === "진행중").length}
                    </div>
                    <div className="text-xs text-white/70">진행중</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                    <div className="text-lg font-bold text-yellow-400">
                      {dailyTasks.filter((t) => t.status === "대기").length}
                    </div>
                    <div className="text-xs text-white/70">대기</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-500/10">
                    <div className="text-lg font-bold text-gray-400">
                      {dailyTasks.filter((t) => t.status === "예정").length}
                    </div>
                    <div className="text-xs text-white/70">예정</div>
                  </div>
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
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    인력 관리
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    현장 공정 관리
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
