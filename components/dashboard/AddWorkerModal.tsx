"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface AddWorkerModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (worker: any) => void
}

export default function AddWorkerModal({ isOpen, onClose, onAdd }: AddWorkerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    workZone: "",
    status: "대기중",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.role && formData.workZone) {
      onAdd({
        ...formData,
        location: "현장 입구",
      })
      setFormData({ name: "", role: "", workZone: "", status: "대기중" })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">새 작업자 추가</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">
                이름
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="작업자 이름"
                required
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-white">
                직책
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="직책 선택" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="철근공">철근공</SelectItem>
                  <SelectItem value="용접공">용접공</SelectItem>
                  <SelectItem value="목수">목수</SelectItem>
                  <SelectItem value="전기공">전기공</SelectItem>
                  <SelectItem value="배관공">배관공</SelectItem>
                  <SelectItem value="안전관리자">안전관리자</SelectItem>
                  <SelectItem value="현장관리자">현장관리자</SelectItem>
                  <SelectItem value="크레인기사">크레인기사</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workZone" className="text-white">
                작업 구역
              </Label>
              <Select
                value={formData.workZone}
                onValueChange={(value) => setFormData({ ...formData, workZone: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="작업 구역 선택" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="기초공사">기초공사</SelectItem>
                  <SelectItem value="골조공사">골조공사</SelectItem>
                  <SelectItem value="마감공사">마감공사</SelectItem>
                  <SelectItem value="안전관리">안전관리</SelectItem>
                  <SelectItem value="중장비">중장비</SelectItem>
                  <SelectItem value="관리업무">관리업무</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                추가
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
