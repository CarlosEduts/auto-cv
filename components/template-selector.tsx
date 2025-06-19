"use client"

import { Card } from "@/components/ui/card"

interface TemplateSelectorProps {
  selectedTemplate: number
  onTemplateChange: (template: number) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const templates = [
    { id: 1, name: "Clássico", description: "Layout tradicional e profissional" },
    { id: 2, name: "Moderno", description: "Design contemporâneo com sidebar" },
    { id: 3, name: "Minimalista", description: "Estilo limpo e minimalista" },
    { id: 4, name: "Criativo", description: "Layout diferenciado e criativo" },
    { id: 5, name: "Executivo", description: "Formal e elegante" },
    { id: 6, name: "Tech", description: "Focado em tecnologia" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id
              ? "border-[#a9746e] bg-[#f2ece6] shadow-md"
              : "border-[#d6c7bd] hover:border-[#a9746e]"
          }`}
          onClick={() => onTemplateChange(template.id)}
        >
          <div className="text-center">
            <div className="w-full h-16 bg-gradient-to-br from-[#f2ece6] to-[#e9dad0] rounded mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#8b5e3c]">{template.id}</span>
            </div>
            <h4 className="font-medium text-[#3e2f28] text-sm">{template.name}</h4>
            <p className="text-xs text-[#6e5848] mt-1">{template.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
