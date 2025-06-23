"use client";

import type { CVData } from "@/lib/cv-data";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Code,
  Database,
  Cpu,
} from "lucide-react";

interface CVTemplate6Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate6({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate6Props) {
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
    <div
      className="max-w-4xl mx-auto bg-gray-900 text-white"
      style={{ fontFamily }}
    >
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded opacity-20"
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-8 mb-6">
            {cvData.photo && (
              <img
                src={cvData.photo || "/placeholder.svg"}
                alt={cvData.fullName}
                className="w-32 h-32 rounded-lg object-cover border-4"
                style={{ borderColor: primaryColor }}
              />
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2 font-mono">
                {cvData.fullName || "Seu Nome"}
              </h1>
              <h2
                className="text-2xl mb-4 font-mono"
                style={{ color: primaryColor }}
              >
                {"<"}
                {cvData.jobTitle || "Sua Profissão"}
                {"/>"}
              </h2>
              <div className="flex items-center gap-4">
                <Code className="w-6 h-6" style={{ color: primaryColor }} />
                <Database className="w-6 h-6" style={{ color: primaryColor }} />
                <Cpu className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="bg-gray-800 rounded-lg p-4 border-l-4"
            style={{ borderColor: primaryColor }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {cvData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-mono">{cvData.email}</span>
                </div>
              )}
              {cvData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-mono">{cvData.phone}</span>
                </div>
              )}
              {cvData.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-mono">{cvData.location}</span>
                </div>
              )}
              {cvData.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-mono">{cvData.website}</span>
                </div>
              )}
              {cvData.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin
                    className="w-4 h-4"
                    style={{ color: primaryColor }}
                  />
                  <span className="font-mono">{cvData.linkedin}</span>
                </div>
              )}
              {cvData.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-mono">{cvData.github}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {cvData.summary && (
          <section className="mb-8">
            <div
              className="bg-gray-800 rounded-lg p-6 border-l-4"
              style={{ borderColor: primaryColor }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-mono text-sm"
                  style={{ color: primaryColor }}
                >
                  {"// "}
                </span>
                <h3 className="text-xl font-bold font-mono">README.md</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                {cvData.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span
                className="font-mono text-sm"
                style={{ color: primaryColor }}
              >
                {"// "}
              </span>
              <h3 className="text-2xl font-bold font-mono">
                work_experience.json
              </h3>
            </div>

            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4
                        className="text-xl font-bold font-mono"
                        style={{ color: primaryColor }}
                      >
                        {exp.position}
                      </h4>
                      <p className="text-lg font-mono text-gray-300">
                        @ {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400 font-mono bg-gray-700 px-3 py-1 rounded">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "current" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div
                      className="bg-gray-900 rounded p-4 border-l-4"
                      style={{ borderColor: primaryColor }}
                    >
                      <p className="text-gray-300 leading-relaxed font-mono text-sm">
                        {exp.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span
                className="font-mono text-sm"
                style={{ color: primaryColor }}
              >
                {"// "}
              </span>
              <h3 className="text-2xl font-bold font-mono">education.config</h3>
            </div>

            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className="text-lg font-bold font-mono"
                        style={{ color: primaryColor }}
                      >
                        {edu.degree}
                      </h4>
                      <p className="font-mono text-gray-300">
                        {edu.field} @ {edu.institution}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400 font-mono bg-gray-700 px-3 py-1 rounded">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.current ? "current" : formatDate(edu.endDate)}
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
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="font-mono text-sm"
                  style={{ color: primaryColor }}
                >
                  {"// "}
                </span>
                <h3 className="text-2xl font-bold font-mono">skills.js</h3>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="space-y-4">
                  {cvData.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span
                          className="font-mono"
                          style={{ color: primaryColor }}
                        >
                          {skill.name}:
                        </span>
                        <span className="font-mono text-gray-400 text-sm">
                          "{skill.level}"
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
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
              </div>
            </section>
          )}

          {/* Languages & Certifications */}
          <div className="space-y-8">
            {/* Languages */}
            {cvData.languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="font-mono text-sm"
                    style={{ color: primaryColor }}
                  >
                    {"// "}
                  </span>
                  <h3 className="text-2xl font-bold font-mono">
                    languages.yml
                  </h3>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="space-y-3">
                    {cvData.languages.map((language, index) => (
                      <div key={index} className="flex justify-between">
                        <span
                          className="font-mono"
                          style={{ color: primaryColor }}
                        >
                          {language.name}:
                        </span>
                        <span className="font-mono text-gray-400">
                          "{language.level}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Certifications */}
            {cvData.certifications.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="font-mono text-sm"
                    style={{ color: primaryColor }}
                  >
                    {"// "}
                  </span>
                  <h3 className="text-2xl font-bold font-mono">
                    certificates.log
                  </h3>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="space-y-4">
                    {cvData.certifications.map((cert, index) => (
                      <div key={index}>
                        <h4
                          className="font-mono font-bold"
                          style={{ color: primaryColor }}
                        >
                          {cert.name}
                        </h4>
                        <p className="font-mono text-gray-300 text-sm">
                          issued_by: {cert.issuer}
                        </p>
                        <p className="font-mono text-gray-400 text-xs">
                          date: {formatDate(cert.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
