"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Building,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // 공사 개요 데이터
  const projectInfo = {
    name: "서울 강남 복합상업시설 건설공사",
    purpose: "복합상업시설 및 오피스텔 건설",
    location: "서울특별시 강남구 테헤란로 123번지",
    contractor: "대한건설(주)",
    scale: "지하 3층, 지상 25층 (연면적 45,000평)",
    budget: "500억원",
    startDate: "2024.03.01",
    endDate: "2026.12.31",
    currentProgress: 67,
  }

  // 예산 관리 통계
  const budgetStats = {
    total: 50000000000, // 500억
    used: 33500000000, // 335억
    remaining: 16500000000, // 165억
    categories: [
      { name: "인건비", budget: 20000000000, used: 13400000000, percentage: 67 },
      { name: "자재비", budget: 15000000000, used: 12000000000, percentage: 80 },
      { name: "장비비", budget: 8000000000, used: 5200000000, percentage: 65 },
      { name: "기타", budget: 7000000000, used: 2900000000, percentage: 41 },
    ],
  }

  // 진척률 데이터
  const progressData = [
    { phase: "기초공사", planned: 100, actual: 100, status: "완료" },
    { phase: "골조공사", planned: 85, actual: 82, status: "진행중" },
    { phase: "마감공사", planned: 45, actual: 23, status: "지연" },
    { phase: "외부공사", planned: 30, actual: 15, status: "대기" },
    { phase: "조경공사", planned: 10, actual: 0, status: "대기" },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억원`
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
      case "지연":
        return "bg-red-500/20 text-red-400"
      case "대기":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                메인으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">통합 대시보드</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="w-3 h-3 mr-1" />
              실시간 연결됨
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              진행률 {projectInfo.currentProgress}%
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 공사 개요 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  공사 개요
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm">공사 현장명</label>
                      <div className="text-white font-semibold">{projectInfo.name}</div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">목적</label>
                      <div className="text-white font-semibold">{projectInfo.purpose}</div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">위치</label>
                      <div className="text-white font-semibold flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {projectInfo.location}
                      </div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">건설사 이름</label>
                      <div className="text-white font-semibold">{projectInfo.contractor}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm">규모 (평)</label>
                      <div className="text-white font-semibold">{projectInfo.scale}</div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">예산</label>
                      <div className="text-white font-semibold">{projectInfo.budget}</div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">공사 기간</label>
                      <div className="text-white font-semibold">
                        {projectInfo.startDate} ~ {projectInfo.endDate}
                      </div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">현재 진행률</label>
                      <div className="flex items-center space-x-3">
                        <div className="text-white font-semibold text-2xl">{projectInfo.currentProgress}%</div>
                        <Progress value={projectInfo.currentProgress} className="flex-1 h-3 bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 예산 관리 통계 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  예산 관리 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* 전체 예산 개요 */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-blue-400">{formatCurrency(budgetStats.total)}</div>
                    <div className="text-sm text-white/70">총 예산</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-red-400">{formatCurrency(budgetStats.used)}</div>
                    <div className="text-sm text-white/70">사용 예산</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(budgetStats.remaining)}</div>
                    <div className="text-sm text-white/70">잔여 예산</div>
                  </div>
                </div>

                {/* 카테고리별 예산 */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold mb-3">카테고리별 예산 사용률</h3>
                  {budgetStats.categories.map((category, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{category.name}</span>
                        <span className="text-white/70">{category.percentage}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-white/60">
                          {formatCurrency(category.used)} / {formatCurrency(category.budget)}
                        </span>
                        <Badge
                          className={
                            category.percentage >= 80
                              ? "bg-red-500/20 text-red-400"
                              : category.percentage >= 60
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }
                        >
                          {category.percentage >= 80 ? "주의" : category.percentage >= 60 ? "보통" : "양호"}
                        </Badge>
                      </div>
                      <Progress value={category.percentage} className="h-2 bg-white/10" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 진척률 그래프 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  공정별 진척률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((phase, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{phase.phase}</h3>
                        <Badge className={getStatusColor(phase.status)}>
                          {phase.status === "완료" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {phase.status === "지연" && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {phase.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">계획 진도</span>
                          <span className="text-blue-400">{phase.planned}%</span>
                        </div>
                        <Progress value={phase.planned} className="h-2 bg-white/10" />
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">실제 진도</span>
                          <span className={phase.actual >= phase.planned ? "text-green-400" : "text-red-400"}>
                            {phase.actual}%
                          </span>
                        </div>
                        <Progress
                          value={phase.actual}
                          className="h-2 bg-white/10"
                          style={
                            {
                              "--progress-background": phase.actual >= phase.planned ? "#10b981" : "#ef4444",
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex justify-between text-xs">
                          <span className="text-white/60">진도 차이</span>
                          <span className={phase.actual >= phase.planned ? "text-green-400" : "text-red-400"}>
                            {phase.actual >= phase.planned ? "+" : ""}
                            {phase.actual - phase.planned}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            {/* 현재까지 공정률 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  현재까지 공정률
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(projectInfo.currentProgress / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{projectInfo.currentProgress}%</div>
                      <div className="text-xs text-white/70">완료</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">예상 완료일</span>
                    <span className="text-white">2026.12.31</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">남은 기간</span>
                    <span className="text-blue-400">692일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">진행 상태</span>
                    <Badge className="bg-green-500/20 text-green-400">정상</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주요 지표 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">주요 지표</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white/70">현장 인원</span>
                  </div>
                  <span className="text-white font-semibold">24명</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-white/70">안전 지수</span>
                  </div>
                  <span className="text-green-400 font-semibold">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-white/70">공사 일수</span>
                  </div>
                  <span className="text-white font-semibold">313일</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-white/70">예산 효율</span>
                  </div>
                  <span className="text-green-400 font-semibold">102%</span>
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

            {/* 최근 알림 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">최근 알림</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    기초공사 100% 완료
                  </div>
                  <div className="text-xs text-white/60 mt-1">1시간 전</div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    자재비 예산 80% 사용
                  </div>
                  <div className="text-xs text-white/60 mt-1">3시간 전</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center text-blue-400 text-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    일일 보고서 생성 완료
                  </div>
                  <div className="text-xs text-white/60 mt-1">5시간 전</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
