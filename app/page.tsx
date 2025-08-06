"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BarChart3, Calendar, Building, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CouplingLanding() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">COUPLING</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              실시간 건설 현장
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                3D 통합관제플랫폼
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              첨단 3D 기술과 실시간 모니터링으로 건설 현장의 안전성과 효율성을 관리합니다.
            </p>
          </div>
        </div>
      </section>

      {/* System Navigation */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">시스템 메뉴</h2>
            <p className="text-xl text-white/70">현장 관리 시스템 접속</p>
          </div>

          {/* 시스템 메뉴 - 3개만 유지 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* 통합 대시보드 */}
            <Link href="/dashboard">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">통합 대시보드</h3>
                  <p className="text-white/70 text-sm mb-4">공사 개요 및 전체 현황 모니터링</p>
                  <ArrowRight className="w-5 h-5 text-cyan-400 mx-auto" />
                </CardContent>
              </Card>
            </Link>

            {/* 인력 관리 */}
            <Link href="/personnel">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">인력 관리</h3>
                  <p className="text-white/70 text-sm mb-4">작업자 배치 및 생체신호 모니터링</p>
                  <ArrowRight className="w-5 h-5 text-purple-400 mx-auto" />
                </CardContent>
              </Card>
            </Link>

            {/* 현장 공정 관리 */}
            <Link href="/progress">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">현장 공정 관리</h3>
                  <p className="text-white/70 text-sm mb-4">공정 계획 및 일정 관리</p>
                  <ArrowRight className="w-5 h-5 text-green-400 mx-auto" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/5 border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">COUPLING</span>
            </div>
            <div className="text-white/60 text-sm">실시간 건설 현장 3D 통합관제플랫폼</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
