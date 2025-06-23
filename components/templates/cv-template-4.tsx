"use client";

import type { CVData } from "@/lib/cv-data";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface CVTemplate4Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate4({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate4Props) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white" style={{ fontFamily }}>
      {/* Header with diagonal design */}
      <header className="relative mb-8 overflow-hidden">
        <div
          className="h-48 relative"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 p-8 text-white">
            <div className="flex items-end gap-6">
              {cvData.photo && (
                <img
                  src={cvData.photo || "/placeholder.svg"}
                  alt={cvData.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              )}
              <div className="flex-1 pb-4">
                <h1 className="text-4xl font-bold mb-2">
                  {cvData.fullName || "Seu Nome"}
                </h1>
                <h2 className="text-xl opacity-90">
                  {cvData.jobTitle || "Sua Profissão"}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Contact bar */}
        <div
          className="bg-gray-50 px-8 py-4 border-l-4"
          style={{ borderColor: primaryColor }}
        >
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.email}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.phone}</span>
              </div>
            )}
            {cvData.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.location}</span>
              </div>
            )}
            {cvData.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.website}</span>
              </div>
            )}
            {cvData.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.linkedin}</span>
              </div>
            )}
            {cvData.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{cvData.github}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-8 pb-8">
        {/* Summary */}
        {cvData.summary && (
          <section className="mb-8">
            <div
              className="bg-gray-50 p-6 rounded-lg border-l-4"
              style={{ borderColor: primaryColor }}
            >
              <p className="text-gray-700 leading-relaxed italic text-lg">
                {cvData.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                E
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Experiência Profissional
              </h3>
            </div>

            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {exp.position}
                      </h4>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: primaryColor }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Presente" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                A
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Educação</h3>
            </div>

            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {edu.degree} em {edu.field}
                      </h4>
                      <p
                        className="font-semibold"
                        style={{ color: primaryColor }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.current ? "Presente" : formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {cvData.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  H
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Habilidades
                </h3>
              </div>

              <div className="space-y-4">
                {cvData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {skill.name}
                      </span>
                      <span
                        className="text-sm px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          backgroundColor: primaryColor,
                          width:
                            skill.level === "Básico"
                              ? "25%"
                              : skill.level === "Intermediário"
                              ? "50%"
                              : skill.level === "Avançado"
                              ? "75%"
                              : "100%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages & Certifications */}
          <div className="space-y-8">
            {/* Languages */}
            {cvData.languages.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    I
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Idiomas</h3>
                </div>

                <div className="space-y-3">
                  {cvData.languages.map((language, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">
                          {language.name}
                        </span>
                        <span
                          className="text-sm px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {language.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {cvData.certifications.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    C
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Certificações
                  </h3>
                </div>

                <div className="space-y-4">
                  {cvData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {cert.name}
                      </h4>
                      <p
                        className="font-medium"
                        style={{ color: primaryColor }}
                      >
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(cert.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
