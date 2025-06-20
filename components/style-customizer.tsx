"use client";

import { Label } from "@/components/ui/label";

interface StyleCustomizerProps {
  primaryColor: string;
  fontFamily: string;
  onPrimaryColorChange: (color: string) => void;
  onFontFamilyChange: (font: string) => void;
}

export function StyleCustomizer({
  primaryColor,
  fontFamily,
  onPrimaryColorChange,
  onFontFamilyChange,
}: StyleCustomizerProps) {
  const colors = [
    { name: "Coffee", value: "#a9746e" },
    { name: "Navy", value: "#2c3e50" },
    { name: "Forest", value: "#27ae60" },
    { name: "Burgundy", value: "#8e44ad" },
    { name: "Teal", value: "#16a085" },
    { name: "Orange", value: "#e67e22" },
  ];

  const fonts = [
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Playfair", value: "Playfair Display, serif" },
    { name: "Roboto Mono", value: "Roboto Mono, monospace" },
    { name: "Dancing Script", value: "Dancing Script, cursive" },
  ];

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div>
        <Label className="text-[var(--color-text-dark)] mb-3 block">
          Cor Principal
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onPrimaryColorChange(color.value)}
              className={`w-full h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                primaryColor === color.value
                  ? "border-[var(--color-text-dark)] shadow-md"
                  : "border-[var(--color-border)] hover:border-[var(--color-focus)]"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Selector */}
      <div>
        <Label className="text-[var(--color-text-dark)] mb-3 block">
          Família Tipográfica
        </Label>
        <div className="space-y-2">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => onFontFamilyChange(font.value)}
              className={`w-full p-3 text-left rounded-lg border transition-all hover:bg-[var(--color-bg-secondary)] ${
                fontFamily === font.value
                  ? "border-[var(--color-accent)] bg-[var(--color-bg-secondary)]"
                  : "border-[var(--color-border)]"
              }`}
              style={{ fontFamily: font.value }}
            >
              <span className="text-[var(--color-text-dark)]">{font.name}</span>
              <div
                className="text-sm text-[var(--color-secondary-text)] mt-1"
                style={{ fontFamily: font.value }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Input */}
      <div>
        <Label
          htmlFor="custom-color"
          className="text-[var(--color-text-dark)] mb-2 block"
        >
          Cor Personalizada
        </Label>
        <div className="flex items-center gap-2">
          <input
            id="custom-color"
            type="color"
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border border-[var(--color-border)] cursor-pointer"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="flex-1 p-2 border border-[var(--color-border)] rounded-md focus:border-[var(--color-focus)] focus:outline-none"
            placeholder="#a9746e"
          />
        </div>
      </div>
    </div>
  );
}
