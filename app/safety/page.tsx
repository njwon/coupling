"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock, Phone, Users } from "lucide-react"
import Link from "next/link"

export default function SafetyPage() {
  const [safetyChecks] = useState([
    { id: 1, area: "1층 동쪽", status: "완료", time: "10:30", inspector: "이영희", risk: "낮음" },
    { id: 2, area: "2층 서쪽", status: "진행중", time: "11:00", inspector: "박민수", risk: "보통" },
    { id: 3, area: "크레인 구역", status: "대기", time: "11:30", inspector: "최동호", risk: "높음" },
    { id: 4, area: "자재 보관소", status: "완료", time: "09:45", inspector: "김철수", risk: "낮음" },
  ])

  const [emergencyAlerts] = useState([
    { id: 1, type: "생체신호 이상", worker: "박민수", time: "2분 전", severity: "높음" },
    { id: 2, type: "안전구역 이탈", worker: "김철수", time: "5분 전", severity: "보통" },
  ])

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
            <h1 className="text-2xl font-bold text-white">안전 관리 시스템</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Shield className="w-3 h-3 mr-1" />
              안전 지수 98%
            </Badge>
            <Link href="/emergency">
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                <Phone className="w-4 h-4 mr-2" />
                긴급 신고
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 안전 점검 현황 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  실시간 안전 점검 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyChecks.map((check) => (
                    <div key={check.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{check.area}</h3>
                        <Badge
                          className={
                            check.status === "완료"
                              ? "bg-green-500/20 text-green-400"
                              : check.status === "진행중"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-500/20 text-gray-400"
                          }
                        >
                          {check.status === "완료" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {check.status === "진행중" && <Clock className="w-3 h-3 mr-1" />}
                          {check.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">점검 시간</span>
                          <div className="text-white">{check.time}</div>
                        </div>
                        <div>
                          <span className="text-white/60">담당자</span>
                          <div className="text-white">{check.inspector}</div>
                        </div>
                        <div>
                          <span className="text-white/60">위험도</span>
                          <Badge
                            className={
                              check.risk === "낮음"
                                ? "bg-green-500/20 text-green-400"
                                : check.risk === "보통"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }
                          >
                            {check.risk}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 안전 통계 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">오늘의 안전 통계</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-sm text-white/70">완료된 점검</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">3</div>
                    <div className="text-sm text-white/70">진행 중</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">0</div>
                    <div className="text-sm text-white/70">사고 발생</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">98%</div>
                    <div className="text-sm text-white/70">안전 지수</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            {/* 긴급 알림 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  긴급 알림
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-400 font-semibold text-sm">{alert.type}</span>
                      <Badge className="bg-red-500/20 text-red-400 text-xs">{alert.severity}</Badge>
                    </div>
                    <div className="text-white text-sm">{alert.worker}</div>
                    <div className="text-white/60 text-xs">{alert.time}</div>
                  </div>
                ))}
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  119 신고하기
                </Button>
              </CardContent>
            </Card>

            {/* 빠른 액션 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">빠른 액션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/viewer">
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    3D 뷰어로 이동
                  </Button>
                </Link>
                <Link href="/personnel">
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    <Users className="w-4 h-4 mr-2" />
                    인력 관리 센터
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    통합 대시보드
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 안전 체크리스트 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">안전 체크리스트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">안전모 착용</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">안전벨트 착용</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">작업 구역 정리</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">장비 점검</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
