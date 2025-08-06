"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  BarChart3,
  Users,
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  Send,
  Search,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [searchTerm, setSearchTerm] = useState("")

  // 보고서 템플릿
  const reportTemplates = [
    {
      id: 1,
      name: "일일 현장 보고서",
      description: "매일 현장 상황, 인력, 안전 현황 종합 보고",
      category: "daily",
      icon: Calendar,
      frequency: "매일",
      lastGenerated: "2025-01-08 18:00",
      status: "자동생성",
      color: "blue",
    },
    {
      id: 2,
      name: "주간 진행 보고서",
      description: "주간 공정 진행률, 예산 사용, 이슈 사항 정리",
      category: "weekly",
      icon: BarChart3,
      frequency: "매주 금요일",
      lastGenerated: "2025-01-03 17:00",
      status: "대기중",
      color: "green",
    },
    {
      id: 3,
      name: "안전 관리 보고서",
      description: "안전 점검 결과, 사고 현황, 개선 사항",
      category: "safety",
      icon: Shield,
      frequency: "매주",
      lastGenerated: "2025-01-06 16:30",
      status: "완료",
      color: "orange",
    },
    {
      id: 4,
      name: "인력 관리 보고서",
      description: "출입 현황, 작업 배치, 생체신호 분석",
      category: "personnel",
      icon: Users,
      frequency: "매일",
      lastGenerated: "2025-01-08 17:45",
      status: "자동생성",
      color: "purple",
    },
    {
      id: 5,
      name: "예산 집행 보고서",
      description: "예산 사용 현황, 카테고리별 분석, 잔여 예산",
      category: "budget",
      icon: DollarSign,
      frequency: "매월",
      lastGenerated: "2025-01-01 09:00",
      status: "완료",
      color: "yellow",
    },
    {
      id: 6,
      name: "월간 종합 보고서",
      description: "전체 프로젝트 진행 상황 종합 분석",
      category: "monthly",
      icon: FileText,
      frequency: "매월 말일",
      lastGenerated: "2024-12-31 23:59",
      status: "완료",
      color: "indigo",
    },
  ]

  // 생성된 보고서 목록
  const generatedReports = [
    {
      id: 1,
      title: "일일 현장 보고서 - 2025.01.08",
      type: "일일",
      generatedAt: "2025-01-08 18:00",
      size: "2.3MB",
      pages: 12,
      status: "완료",
      downloadCount: 5,
      recipients: ["현장소장", "안전관리자", "본사"],
    },
    {
      id: 2,
      title: "안전 관리 보고서 - 2025.01.06",
      type: "안전",
      generatedAt: "2025-01-06 16:30",
      size: "1.8MB",
      pages: 8,
      status: "완료",
      downloadCount: 12,
      recipients: ["안전관리자", "본사 안전팀"],
    },
    {
      id: 3,
      title: "주간 진행 보고서 - 2025.01.03",
      type: "주간",
      generatedAt: "2025-01-03 17:00",
      size: "4.1MB",
      pages: 18,
      status: "완료",
      downloadCount: 8,
      recipients: ["프로젝트 매니저", "본사", "발주처"],
    },
    {
      id: 4,
      title: "인력 관리 보고서 - 2025.01.08",
      type: "인력",
      generatedAt: "2025-01-08 17:45",
      size: "1.5MB",
      pages: 6,
      status: "완료",
      downloadCount: 3,
      recipients: ["인사팀", "현장소장"],
    },
    {
      id: 5,
      title: "예산 집행 보고서 - 2025.01.01",
      type: "예산",
      generatedAt: "2025-01-01 09:00",
      size: "3.2MB",
      pages: 15,
      status: "완료",
      downloadCount: 15,
      recipients: ["재무팀", "프로젝트 매니저", "본사"],
    },
  ]

  // 보고서 통계
  const reportStats = {
    totalReports: 156,
    thisMonth: 24,
    automated: 18,
    manual: 6,
    avgGenerationTime: "3.2분",
    totalDownloads: 342,
  }

  const filteredReports = generatedReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedReportType === "all" || report.type.includes(selectedReportType)
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료":
        return "bg-green-500/20 text-green-400"
      case "자동생성":
        return "bg-blue-500/20 text-blue-400"
      case "대기중":
        return "bg-yellow-500/20 text-yellow-400"
      case "생성중":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "daily":
        return "bg-blue-500/20 text-blue-400"
      case "weekly":
        return "bg-green-500/20 text-green-400"
      case "monthly":
        return "bg-purple-500/20 text-purple-400"
      case "safety":
        return "bg-orange-500/20 text-orange-400"
      case "personnel":
        return "bg-pink-500/20 text-pink-400"
      case "budget":
        return "bg-yellow-500/20 text-yellow-400"
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
                홈으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">보고서 관리 시스템</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <FileText className="w-3 h-3 mr-1" />
              자동 생성 활성
            </Badge>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <Plus className="w-4 h-4 mr-2" />새 보고서
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* 통계 개요 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.totalReports}</div>
                  <div className="text-sm text-white/70">총 보고서</div>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.thisMonth}</div>
                  <div className="text-sm text-white/70">이번 달</div>
                </div>
                <Calendar className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.automated}</div>
                  <div className="text-sm text-white/70">자동 생성</div>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.manual}</div>
                  <div className="text-sm text-white/70">수동 생성</div>
                </div>
                <Users className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.avgGenerationTime}</div>
                  <div className="text-sm text-white/70">평균 생성시간</div>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{reportStats.totalDownloads}</div>
                  <div className="text-sm text-white/70">총 다운로드</div>
                </div>
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                <TabsTrigger value="templates" className="text-white data-[state=active]:bg-white/20">
                  보고서 템플릿
                </TabsTrigger>
                <TabsTrigger value="generated" className="text-white data-[state=active]:bg-white/20">
                  생성된 보고서
                </TabsTrigger>
                <TabsTrigger value="schedule" className="text-white data-[state=active]:bg-white/20">
                  자동 생성 일정
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">보고서 템플릿 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportTemplates.map((template) => (
                        <div key={template.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <template.icon className="w-5 h-5 text-white mr-3" />
                              <h3 className="text-white font-semibold">{template.name}</h3>
                            </div>
                            <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                          </div>
                          <p className="text-white/70 text-sm mb-3">{template.description}</p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-white/60">생성 주기:</span>
                              <span className="text-white">{template.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">마지막 생성:</span>
                              <span className="text-white">{template.lastGenerated}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400">
                              <Eye className="w-3 h-3 mr-1" />
                              미리보기
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400">
                              <Download className="w-3 h-3 mr-1" />
                              생성
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="generated" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">생성된 보고서</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                          <Input
                            placeholder="보고서 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-64"
                          />
                        </div>
                        <select
                          value={selectedReportType}
                          onChange={(e) => setSelectedReportType(e.target.value)}
                          className="bg-white/10 border border-white/20 text-white rounded px-3 py-2 text-sm"
                        >
                          <option value="all">전체</option>
                          <option value="일일">일일</option>
                          <option value="주간">주간</option>
                          <option value="월간">월간</option>
                          <option value="안전">안전</option>
                          <option value="인력">인력</option>
                          <option value="예산">예산</option>
                        </select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredReports.map((report) => (
                        <div key={report.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-blue-400 mr-3" />
                              <div>
                                <h3 className="text-white font-semibold">{report.title}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getCategoryColor(report.type)}>{report.type}</Badge>
                                  <span className="text-white/60 text-xs">{report.generatedAt}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                            <div>
                              <span className="text-white/60">파일 크기:</span>
                              <div className="text-white">{report.size}</div>
                            </div>
                            <div>
                              <span className="text-white/60">페이지 수:</span>
                              <div className="text-white">{report.pages}페이지</div>
                            </div>
                            <div>
                              <span className="text-white/60">다운로드:</span>
                              <div className="text-white">{report.downloadCount}회</div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="text-white/60 text-sm">수신자: </span>
                            <span className="text-white text-sm">{report.recipients.join(", ")}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400">
                              <Eye className="w-3 h-3 mr-1" />
                              보기
                            </Button>
                            <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-400">
                              <Download className="w-3 h-3 mr-1" />
                              다운로드
                            </Button>
                            <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400">
                              <Send className="w-3 h-3 mr-1" />
                              공유
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">자동 생성 일정</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">오늘 예정된 보고서</h3>
                          <Badge className="bg-blue-500/20 text-blue-400">3건</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">일일 현장 보고서</span>
                            <span className="text-blue-400">18:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">인력 관리 보고서</span>
                            <span className="text-blue-400">17:45</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">안전 점검 보고서</span>
                            <span className="text-blue-400">16:30</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">이번 주 예정</h3>
                          <Badge className="bg-green-500/20 text-green-400">2건</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">주간 진행 보고서</span>
                            <span className="text-green-400">금요일 17:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">안전 관리 보고서</span>
                            <span className="text-green-400">일요일 16:30</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">이번 달 예정</h3>
                          <Badge className="bg-purple-500/20 text-purple-400">1건</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">월간 종합 보고서</span>
                            <span className="text-purple-400">1월 31일 23:59</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            {/* 빠른 생성 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">빠른 보고서 생성</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  일일 보고서
                </Button>
                <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  진행 현황 보고서
                </Button>
                <Button className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30">
                  <Shield className="w-4 h-4 mr-2" />
                  안전 점검 보고서
                </Button>
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                  <Users className="w-4 h-4 mr-2" />
                  인력 현황 보고서
                </Button>
                <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30">
                  <DollarSign className="w-4 h-4 mr-2" />
                  예산 집행 보고서
                </Button>
              </CardContent>
            </Card>

            {/* 최근 활동 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">최근 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center text-green-400 text-sm mb-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    보고서 생성 완료
                  </div>
                  <div className="text-white/70 text-xs">일일 현장 보고서 - 2분 전</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center text-blue-400 text-sm mb-1">
                    <Download className="w-4 h-4 mr-2" />
                    보고서 다운로드
                  </div>
                  <div className="text-white/70 text-xs">주간 진행 보고서 - 15분 전</div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center text-purple-400 text-sm mb-1">
                    <Send className="w-4 h-4 mr-2" />
                    보고서 공유
                  </div>
                  <div className="text-white/70 text-xs">안전 관리 보고서 - 1시간 전</div>
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
                <Link href="/viewer">
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    3D 뷰어로 이동
                  </Button>
                </Link>
                <Link href="/safety">
                  <Button className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30">
                    안전 관리 시스템
                  </Button>
                </Link>
                <Link href="/budget">
                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30">
                    예산 관리 시스템
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 보고서 설정 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">보고서 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white text-sm">자동 생성</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-sm">일일 보고서</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">주간 보고서</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">이메일 알림</span>
                    <div className="w-10 h-6 bg-gray-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
