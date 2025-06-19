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
import { Download, FileText, Coffee, Eye } from "lucide-react";

export function CVGenerator() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [primaryColor, setPrimaryColor] = useState("#a9746e");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className=" bg-[#faf6f2]">
      {/* Header */}
      <header className="bg-[#faf6f2] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-2xl font-bold text-[#3e2f28] font-serif">
                auto-cv
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a href="#template" className="text-[#8b5e3c] font-medium">
                Template
              </a>
              <a href="#style" className="text-[#8b5e3c] font-medium">
                Estilo
              </a>
              <a href="#data" className="text-[#8b5e3c] font-medium">
                Dados
              </a>
              <a href="#preview" className="text-[#8b5e3c] bg-[#cdbbaec0] p-1 rounded-full font-medium">
                <Eye/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl flex flex-col md:flex-row gap-6 mx-auto px-4 py-6">
        <div className="flex w-full md:w-2/3 h-[calc(100dvh-200px)] overflow-y-auto flex-col gap-6 mb-6">
          {/* Template */}
          <Card className="p-6 bg-white border-[#d6c7bd]" id="template">
            <h2 className="text-lg font-semibold text-[#3e2f28] mb-4">
              Escolher Template
            </h2>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </Card>

          {/* Style Selectors */}
          <Card className="p-6 bg-white border-[#d6c7bd]" id="style">
            <h2 className="text-lg font-semibold text-[#3e2f28] mb-4">
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
          <Card className="p-6 bg-white border-[#d6c7bd]" id="data">
            <h2 className="text-lg font-semibold text-[#3e2f28] mb-4">
              Dados Pessoais
            </h2>
            <CVForm cvData={cvData} onDataChange={setCVData} />
          </Card>
        </div>

        {/* Preview */}
        <div className="w-full md:w-1/3">
          <Card className="p-6 bg-white border-[#d6c7bd]" id="preview">
            <div className="flex w-full justify-between">
              <h2 className="text-lg font-semibold text-[#3e2f28]"><Eye className="text-[#8b5e3c] bg-[#cdbbaec0] p-0.5 rounded-full"/></h2>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExportHTML}
                  variant="outline"
                  size="sm"
                  className="bg-white text-[#8b5e3c] border-[#d6c7bd] hover:bg-[#e9dad0]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  HTML
                </Button>
                <Button
                  onClick={handleExportPDF}
                  disabled={isLoading}
                  size="sm"
                  className="bg-[#8b5e3c] hover:bg-[#a9746e] text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isLoading ? "Exportando..." : "PDF"}
                </Button>
              </div>
            </div>

            <div className="border border-[#d6c7bd] rounded-lg overflow-hidden">
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
