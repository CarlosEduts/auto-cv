"use client";

import type { CVData } from "@/lib/cv-data";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface CVTemplate3Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate3({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate3Props) {
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
    <div className="max-w-4xl mx-auto bg-white p-8" style={{ fontFamily }}>
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-8 mb-6">
          {cvData.photo && (
            <img
              src={cvData.photo || "/placeholder.svg"}
              alt={cvData.fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-light mb-2 text-gray-800">
              {cvData.fullName || "Seu Nome"}
            </h1>
            <h2 className="text-2xl font-light text-gray-600">
              {cvData.jobTitle || "Sua Profissão"}
            </h2>
          </div>
        </div>

        <div className="h-px bg-gray-300 mb-6"></div>

        {/* Contact Info */}
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
      </header>

      {/* Summary */}
      {cvData.summary && (
        <section className="mb-12">
          <div className="text-gray-700 leading-relaxed text-lg font-light">
            {cvData.summary}
          </div>
        </section>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <section className="mb-12">
          <h3
            className="text-2xl font-light mb-8 text-gray-800 border-b pb-2"
            style={{ borderColor: primaryColor }}
          >
            Experiência
          </h3>
          <div className="space-y-8">
            {cvData.experience.map((exp, index) => (
              <div key={index} className="relative pl-8">
                <div
                  className="absolute left-0 top-2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <div className="absolute left-1.5 top-5 w-px h-full bg-gray-200"></div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">
                      {exp.position}
                    </h4>
                    <p
                      className="text-lg font-light"
                      style={{ color: primaryColor }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed font-light">
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
        <section className="mb-12">
          <h3
            className="text-2xl font-light mb-8 text-gray-800 border-b pb-2"
            style={{ borderColor: primaryColor }}
          >
            Educação
          </h3>
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <div key={index} className="relative pl-8">
                <div
                  className="absolute left-0 top-2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">
                      {edu.degree}
                    </h4>
                    <p className="font-light" style={{ color: primaryColor }}>
                      {edu.field} • {edu.institution}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.current ? "Presente" : formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Skills */}
        {cvData.skills.length > 0 && (
          <section>
            <h3
              className="text-2xl font-light mb-6 text-gray-800 border-b pb-2"
              style={{ borderColor: primaryColor }}
            >
              Habilidades
            </h3>
            <div className="space-y-4">
              {cvData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-light text-gray-800">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 font-light">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                      className="h-1 rounded-full"
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
              <h3
                className="text-2xl font-light mb-6 text-gray-800 border-b pb-2"
                style={{ borderColor: primaryColor }}
              >
                Idiomas
              </h3>
              <div className="space-y-3">
                {cvData.languages.map((language, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-light text-gray-800">
                      {language.name}
                    </span>
                    <span
                      className="text-sm font-light"
                      style={{ color: primaryColor }}
                    >
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cvData.certifications.length > 0 && (
            <section>
              <h3
                className="text-2xl font-light mb-6 text-gray-800 border-b pb-2"
                style={{ borderColor: primaryColor }}
              >
                Certificações
              </h3>
              <div className="space-y-4">
                {cvData.certifications.map((cert, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <p
                      className="text-sm font-light"
                      style={{ color: primaryColor }}
                    >
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 font-light">
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
  );
}
