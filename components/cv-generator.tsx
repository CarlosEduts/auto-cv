"use client";

import { useState, useEffect } from "react";
import { CVForm } from "./cv-form";
import { CVPreview } from "./cv-preview";
import { TemplateSelector } from "./template-selector";
import { StyleCustomizer } from "./style-customizer";
import { type CVData, defaultCVData } from "@/lib/cv-data";
import { exportToPDF, exportToHTML } from "@/lib/export-utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  FileText,
  Coffee,
  Eye,
  Lightbulb,
  LightbulbOff,
} from "lucide-react";

export function CVGenerator() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [primaryColor, setPrimaryColor] = useState("#a9746e");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("auto-cv-data");
    const savedTemplate = localStorage.getItem("auto-cv-template");
    const savedPrimaryColor = localStorage.getItem("auto-cv-primary-color");
    const savedFontFamily = localStorage.getItem("auto-cv-font-family");

    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved CV data:", error);
      }
    }
    if (savedTemplate) setSelectedTemplate(Number.parseInt(savedTemplate));
    if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auto-cv-data", JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem("auto-cv-template", selectedTemplate.toString());
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("auto-cv-primary-color", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("auto-cv-font-family", fontFamily);
  }, [fontFamily]);

  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      await exportToPDF(cvData, selectedTemplate, primaryColor, fontFamily);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportHTML = () => {
    exportToHTML(cvData, selectedTemplate, primaryColor, fontFamily);
  };

  return (
    <div className={`min-h-dvh bg-[var(--color-bg)] ${theme}`}>
      {/* Header */}
      <header className="bg-[var(--color-bg)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--color-text-dark)] font-serif">
                auto-cv
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#template"
                className="text-[var(--color-primary)] font-medium"
              >
                Template
              </a>
              <a
                href="#style"
                className="text-[var(--color-primary)] font-medium"
              >
                Estilo
              </a>
              <a
                href="#data"
                className="text-[var(--color-primary)] font-medium"
              >
                Dados
              </a>
              <a
                href="#preview"
                className="text-[var(--color-primary)] bg-[var(--color-primary-bg)] p-1 rounded-full text-xs font-medium"
              >
                <Eye />
              </a>
              <button
                className="text-[var(--color-primary)] bg-[var(--color-primary-bg)] p-1 rounded-full text-xs font-medium"
                onClick={() => {
                  theme == "light" ? setTheme("dark") : setTheme("light");
                }}
              >
                {theme == "light" ? <Lightbulb /> : <LightbulbOff />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl flex flex-col md:flex-row gap-6 mx-auto px-4 py-6">
        <div className="flex w-full md:w-2/3 h-[calc(100vh-200px)] overflow-y-auto flex-col gap-6 mb-6">
          {/* Template */}
          <Card
            className="p-6 bg-[var(--color-white)] border-[var(--color-border)]"
            id="template"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] mb-4">
              Escolher Template
            </h2>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </Card>

          {/* Style Selectors */}
          <Card
            className="p-6 bg-[var(--color-white)] border-[var(--color-border)]"
            id="style"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] mb-4">
              Personalizar Estilo
            </h2>
            <StyleCustomizer
              primaryColor={primaryColor}
              fontFamily={fontFamily}
              onPrimaryColorChange={setPrimaryColor}
              onFontFamilyChange={setFontFamily}
            />
          </Card>

          {/* Form */}
          <Card
            className="p-6 bg-[var(--color-white)] border-[var(--color-border)]"
            id="data"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] mb-4">
              Dados Pessoais
            </h2>
            <CVForm cvData={cvData} onDataChange={setCVData} />
          </Card>
        </div>

        {/* Preview */}
        <div className="w-full md:w-1/3">
          <Card
            className="p-6 bg-[var(--color-white)] border-[var(--color-border)]"
            id="preview"
          >
            <div className="flex w-full justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-text-dark)]">
                <Eye className="text-[var(--color-primary)] bg-[var(--color-primary-bg)] p-0.5 rounded-full" />
              </h2>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExportHTML}
                  variant="outline"
                  size="sm"
                  className="bg-[var(--color-white)] text-[var(--color-primary)] border-[var(--color-border)] hover:bg-[var(--color-hover)]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  HTML
                </Button>
                <Button
                  onClick={handleExportPDF}
                  disabled={isLoading}
                  size="sm"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isLoading ? "Exportando..." : "PDF"}
                </Button>
              </div>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
              <CVPreview
                cvData={cvData}
                template={selectedTemplate}
                primaryColor={primaryColor}
                fontFamily={fontFamily}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
