"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Package,
  Users,
  Building,
  Wrench,
  PieChart,
} from "lucide-react"
import Link from "next/link"

export default function BudgetPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // 예산 데이터
  const budgetOverview = {
    totalBudget: 5000000000, // 50억
    usedBudget: 3350000000, // 33.5억
    remainingBudget: 1650000000, // 16.5억
    progressPercentage: 67,
  }

  const categoryBudgets = [
    {
      category: "인건비",
      icon: Users,
      allocated: 2000000000,
      used: 1340000000,
      remaining: 660000000,
      percentage: 67,
      status: "정상",
      color: "blue",
    },
    {
      category: "자재비",
      icon: Package,
      allocated: 1500000000,
      used: 1200000000,
      remaining: 300000000,
      percentage: 80,
      status: "주의",
      color: "yellow",
    },
    {
      category: "장비비",
      icon: Wrench,
      allocated: 800000000,
      used: 520000000,
      remaining: 280000000,
      percentage: 65,
      status: "정상",
      color: "green",
    },
    {
      category: "기타비용",
      icon: Building,
      allocated: 700000000,
      used: 290000000,
      remaining: 410000000,
      percentage: 41,
      status: "여유",
      color: "purple",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      date: "2025-01-08",
      category: "자재비",
      description: "철근 구매 (50톤)",
      amount: -25000000,
      balance: 3350000000,
      status: "승인",
    },
    {
      id: 2,
      date: "2025-01-07",
      category: "인건비",
      description: "12월 급여 지급",
      amount: -180000000,
      balance: 3375000000,
      status: "완료",
    },
    {
      id: 3,
      date: "2025-01-06",
      category: "장비비",
      description: "크레인 임대료",
      amount: -15000000,
      balance: 3555000000,
      status: "완료",
    },
    {
      id: 4,
      date: "2025-01-05",
      category: "자재비",
      description: "시멘트 구매",
      amount: -8000000,
      balance: 3570000000,
      status: "완료",
    },
    {
      id: 5,
      date: "2025-01-04",
      category: "기타비용",
      description: "안전장비 구매",
      amount: -3500000,
      balance: 3578000000,
      status: "완료",
    },
  ]

  const monthlyTrend = [
    { month: "8월", budget: 400000000, actual: 380000000 },
    { month: "9월", budget: 450000000, actual: 470000000 },
    { month: "10월", budget: 500000000, actual: 485000000 },
    { month: "11월", budget: 480000000, actual: 495000000 },
    { month: "12월", budget: 520000000, actual: 510000000 },
    { month: "1월", budget: 550000000, actual: 520000000 },
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
      case "정상":
        return "bg-green-500/20 text-green-400"
      case "주의":
        return "bg-yellow-500/20 text-yellow-400"
      case "위험":
        return "bg-red-500/20 text-red-400"
      case "여유":
        return "bg-blue-500/20 text-blue-400"
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
            <h1 className="text-2xl font-bold text-white">예산 관리 시스템</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <DollarSign className="w-3 h-3 mr-1" />
              예산 내 진행
            </Badge>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 border border-white/20 text-white rounded px-3 py-1 text-sm"
            >
              <option value="week">주간</option>
              <option value="month">월간</option>
              <option value="quarter">분기</option>
              <option value="year">연간</option>
            </select>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* 예산 개요 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">총 예산</h3>
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{formatCurrency(budgetOverview.totalBudget)}</div>
              <div className="text-sm text-white/70">전체 프로젝트 예산</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">사용 예산</h3>
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-red-400 mb-2">{formatCurrency(budgetOverview.usedBudget)}</div>
              <div className="text-sm text-white/70">{budgetOverview.progressPercentage}% 진행</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">잔여 예산</h3>
                <TrendingDown className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">
                {formatCurrency(budgetOverview.remainingBudget)}
              </div>
              <div className="text-sm text-white/70">남은 예산</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">진행률</h3>
                <PieChart className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{budgetOverview.progressPercentage}%</div>
              <Progress value={budgetOverview.progressPercentage} className="h-2 bg-white/10" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                <TabsTrigger value="categories" className="text-white data-[state=active]:bg-white/20">
                  카테고리별
                </TabsTrigger>
                <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-white/20">
                  거래 내역
                </TabsTrigger>
                <TabsTrigger value="trends" className="text-white data-[state=active]:bg-white/20">
                  추세 분석
                </TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">카테고리별 예산 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {categoryBudgets.map((category, index) => (
                        <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <category.icon className="w-5 h-5 text-white mr-3" />
                              <h3 className="text-white font-semibold">{category.category}</h3>
                            </div>
                            <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                            <div>
                              <span className="text-white/60">배정 예산</span>
                              <div className="text-white font-semibold">{formatCurrency(category.allocated)}</div>
                            </div>
                            <div>
                              <span className="text-white/60">사용 예산</span>
                              <div className="text-white font-semibold">{formatCurrency(category.used)}</div>
                            </div>
                            <div>
                              <span className="text-white/60">잔여 예산</span>
                              <div className="text-white font-semibold">{formatCurrency(category.remaining)}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/70 text-sm">사용률</span>
                            <span className="text-white font-semibold">{category.percentage}%</span>
                          </div>
                          <Progress value={category.percentage} className="h-2 bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">최근 거래 내역</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                              <span className="text-white text-sm">{transaction.date}</span>
                              <Badge className="ml-2 bg-blue-500/20 text-blue-400 text-xs">
                                {transaction.category}
                              </Badge>
                            </div>
                            <Badge
                              className={
                                transaction.status === "완료"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {transaction.status === "완료" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {transaction.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white">{transaction.description}</span>
                            <div className="text-right">
                              <div
                                className={`font-semibold ${transaction.amount < 0 ? "text-red-400" : "text-green-400"}`}
                              >
                                {transaction.amount < 0 ? "-" : "+"}
                                {formatCurrency(Math.abs(transaction.amount))}
                              </div>
                              <div className="text-white/60 text-xs">잔액: {formatCurrency(transaction.balance)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">월별 예산 추세</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyTrend.map((month, index) => (
                        <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">{month.month}</h3>
                            <div className="flex items-center space-x-2">
                              {month.actual <= month.budget ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                              )}
                              <span
                                className={`text-sm ${month.actual <= month.budget ? "text-green-400" : "text-red-400"}`}
                              >
                                {month.actual <= month.budget ? "예산 내" : "예산 초과"}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="text-white/60 text-sm">계획 예산</span>
                              <div className="text-white font-semibold">{formatCurrency(month.budget)}</div>
                            </div>
                            <div>
                              <span className="text-white/60 text-sm">실제 사용</span>
                              <div className="text-white font-semibold">{formatCurrency(month.actual)}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">계획</span>
                              <span className="text-blue-400">{formatCurrency(month.budget)}</span>
                            </div>
                            <Progress value={(month.budget / 600000000) * 100} className="h-1 bg-white/10" />
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">실제</span>
                              <span className={month.actual <= month.budget ? "text-green-400" : "text-red-400"}>
                                {formatCurrency(month.actual)}
                              </span>
                            </div>
                            <Progress
                              value={(month.actual / 600000000) * 100}
                              className="h-1 bg-white/10"
                              style={
                                {
                                  "--progress-background": month.actual <= month.budget ? "#10b981" : "#ef4444",
                                } as React.CSSProperties
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            {/* 예산 알림 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  예산 알림
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 font-semibold text-sm">자재비 주의</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">80% 사용</Badge>
                  </div>
                  <div className="text-white/70 text-xs">자재비 예산의 80%가 사용되었습니다.</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-semibold text-sm">장비비 양호</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">65% 사용</Badge>
                  </div>
                  <div className="text-white/70 text-xs">장비비 예산이 안정적으로 관리되고 있습니다.</div>
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
                <Link href="/personnel">
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    <Users className="w-4 h-4 mr-2" />
                    인력 관리 센터
                  </Button>
                </Link>
                <Link href="/safety">
                  <Button className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30">
                    안전 관리 시스템
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 예산 요약 */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">이번 달 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">총 지출</span>
                  <span className="text-red-400 font-semibold">{formatCurrency(231500000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">계획 대비</span>
                  <span className="text-green-400 font-semibold">-5.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">절약 금액</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(12500000)}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">예상 완료일</span>
                    <span className="text-white font-semibold">2025.06.15</span>
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
