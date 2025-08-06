"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Phone,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Activity,
  Shield,
  Siren,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyForm, setEmergencyForm] = useState({
    type: "",
    location: "",
    description: "",
    reporter: "",
    severity: "보통",
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [emergencyHistory] = useState([
    {
      id: 1,
      type: "생체신호 이상",
      location: "2층 서쪽",
      reporter: "시스템 자동",
      time: "14:23",
      status: "처리완료",
      severity: "높음",
    },
    {
      id: 2,
      type: "안전구역 이탈",
      location: "크레인 구역",
      reporter: "이영희",
      time: "13:45",
      status: "대응중",
      severity: "보통",
    },
    {
      id: 3,
      type: "장비 고장",
      location: "1층 동쪽",
      reporter: "김철수",
      time: "12:30",
      status: "처리완료",
      severity: "낮음",
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true)
    // 실제로는 119 신고 API 호출
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 5000)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 긴급 신고 처리 로직
    alert("긴급 신고가 접수되었습니다.")
    setEmergencyForm({
      type: "",
      location: "",
      description: "",
      reporter: "",
      severity: "보통",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Emergency Alert Overlay */}
      {isEmergencyActive && (
        <div className="fixed inset-0 bg-red-600/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-white/10 border-red-500/50 max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <Siren className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-4">119 신고 중...</h2>
              <p className="text-white/80 mb-6">긴급 상황이 신고되었습니다. 구조대가 출동 중입니다.</p>
              <Button onClick={() => setIsEmergencyActive(false)} className="bg-white text-red-600 hover:bg-white/90">
                확인
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

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
            <h1 className="text-2xl font-bold text-white">119 긴급 대응 센터</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              긴급 대응 모드
            </Badge>
            <div className="text-white text-sm">{currentTime.toLocaleTimeString("ko-KR")}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 긴급 신고 섹션 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 즉시 119 신고 */}
            <Card className="backdrop-blur-md bg-red-500/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-red-400" />
                  즉시 119 신고
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button
                    size="lg"
                    onClick={handleEmergencyCall}
                    className="bg-red-500 hover:bg-red-600 text-white text-xl px-12 py-6 rounded-full"
                    disabled={isEmergencyActive}
                  >
                    <Phone className="w-8 h-8 mr-3" />
                    119 신고하기
                  </Button>
                  <p className="text-white/70 mt-4 text-sm">생명이 위험한 응급상황 시 즉시 클릭하세요</p>
                </div>
              </CardContent>
            </Card>

            {/* 상세 신고 양식 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  상세 신고 양식
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm mb-2 block">사고 유형</label>
                      <select
                        value={emergencyForm.type}
                        onChange={(e) => setEmergencyForm({ ...emergencyForm, type: e.target.value })}
                        className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                        required
                      >
                        <option value="">선택하세요</option>
                        <option value="추락사고">추락사고</option>
                        <option value="화재">화재</option>
                        <option value="감전사고">감전사고</option>
                        <option value="장비사고">장비사고</option>
                        <option value="생체신호이상">생체신호 이상</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white text-sm mb-2 block">심각도</label>
                      <select
                        value={emergencyForm.severity}
                        onChange={(e) => setEmergencyForm({ ...emergencyForm, severity: e.target.value })}
                        className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                      >
                        <option value="낮음">낮음</option>
                        <option value="보통">보통</option>
                        <option value="높음">높음</option>
                        <option value="매우높음">매우 높음</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm mb-2 block">발생 위치</label>
                      <Input
                        value={emergencyForm.location}
                        onChange={(e) => setEmergencyForm({ ...emergencyForm, location: e.target.value })}
                        placeholder="예: 2층 서쪽, 크레인 구역"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm mb-2 block">신고자</label>
                      <Input
                        value={emergencyForm.reporter}
                        onChange={(e) => setEmergencyForm({ ...emergencyForm, reporter: e.target.value })}
                        placeholder="신고자 이름"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm mb-2 block">상세 설명</label>
                    <Textarea
                      value={emergencyForm.description}
                      onChange={(e) => setEmergencyForm({ ...emergencyForm, description: e.target.value })}
                      placeholder="사고 상황을 자세히 설명해주세요"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    신고 접수
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 신고 이력 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  오늘의 신고 이력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyHistory.map((emergency) => (
                    <div key={emergency.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">{emergency.type}</h3>
                        <Badge
                          className={
                            emergency.status === "처리완료"
                              ? "bg-green-500/20 text-green-400"
                              : emergency.status === "대응중"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {emergency.status === "처리완료" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {emergency.status === "대응중" && <Clock className="w-3 h-3 mr-1" />}
                          {emergency.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-white/60">위치:</span>
                          <div className="text-white">{emergency.location}</div>
                        </div>
                        <div>
                          <span className="text-white/60">신고자:</span>
                          <div className="text-white">{emergency.reporter}</div>
                        </div>
                        <div>
                          <span className="text-white/60">시간:</span>
                          <div className="text-white">{emergency.time}</div>
                        </div>
                        <div>
                          <span className="text-white/60">심각도:</span>
                          <Badge
                            className={
                              emergency.severity === "높음"
                                ? "bg-red-500/20 text-red-400"
                                : emergency.severity === "보통"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }
                          >
                            {emergency.severity}
                          </Badge>
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
            {/* 긴급 연락처 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">긴급 연락처</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-400 font-semibold">119 (소방서)</div>
                      <div className="text-white/70 text-sm">화재, 구조, 응급의료</div>
                    </div>
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-blue-400 font-semibold">112 (경찰서)</div>
                      <div className="text-white/70 text-sm">사건, 사고 신고</div>
                    </div>
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-400 font-semibold">현장 관리소</div>
                      <div className="text-white/70 text-sm">02-1234-5678</div>
                    </div>
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 실시간 현장 상태 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">실시간 현장 상태</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white/70">현장 인원</span>
                  </div>
                  <span className="text-white font-semibold">24명</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-white/70">생체신호 정상</span>
                  </div>
                  <span className="text-green-400 font-semibold">22명</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-white/70">주의 필요</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">2명</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-white/70">안전 지수</span>
                  </div>
                  <span className="text-green-400 font-semibold">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 액션 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">빠른 액션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/safety">
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    <Shield className="w-4 h-4 mr-2" />
                    안전 관리로 이동
                  </Button>
                </Link>
                <Link href="/viewer">
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    <MapPin className="w-4 h-4 mr-2" />
                    3D 뷰어로 이동
                  </Button>
                </Link>
                <Link href="/personnel">
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    <User className="w-4 h-4 mr-2" />
                    인력 관리 센터
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border-cyan-500/30">
                    통합 대시보드
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
