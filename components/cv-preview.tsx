"use client";

import type { CVData } from "@/lib/cv-data";
import { CVTemplate1 } from "./templates/cv-template-1";
import { CVTemplate2 } from "./templates/cv-template-2";
import { CVTemplate3 } from "./templates/cv-template-3";
import { CVTemplate4 } from "./templates/cv-template-4";
import { CVTemplate5 } from "./templates/cv-template-5";
import { CVTemplate6 } from "./templates/cv-template-6";

interface CVPreviewProps {
  cvData: CVData;
  template: number;
  primaryColor: string;
  fontFamily: string;
}

export function CVPreview({
  cvData,
  template,
  primaryColor,
  fontFamily,
}: CVPreviewProps) {
  const templateProps = {
    cvData,
    primaryColor,
    fontFamily,
  };

  const renderTemplate = () => {
    switch (template) {
      case 1:
        return <CVTemplate1 {...templateProps} />;
      case 2:
        return <CVTemplate2 {...templateProps} />;
      case 3:
        return <CVTemplate3 {...templateProps} />;
      case 4:
        return <CVTemplate4 {...templateProps} />;
      case 5:
        return <CVTemplate5 {...templateProps} />;
      case 6:
        return <CVTemplate6 {...templateProps} />;
      default:
        return <CVTemplate1 {...templateProps} />;
    }
  };

  return (
    <div
      id="cv-preview"
      className="w-full bg-white shadow-sm"
      style={{
        fontFamily: fontFamily,
        minHeight: "180mm", // A4 height
        transform: "scale(0.6)",
        transformOrigin: "top left",
        width: "166.67%", // Compensate for scale
      }}
    >
      {renderTemplate()}
    </div>
  );
}
