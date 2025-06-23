"use client";

import type { CVData } from "@/lib/cv-data";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface CVTemplate1Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate1({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate1Props) {
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
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: primaryColor }}
      >
        {cvData.photo && (
          <img
            src={cvData.photo || "/placeholder.svg"}
            alt={cvData.fullName}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4"
            style={{ borderColor: primaryColor }}
          />
        )}
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          {cvData.fullName || "Seu Nome"}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">
          {cvData.jobTitle || "Sua Profissão"}
        </h2>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {cvData.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{cvData.email}</span>
            </div>
          )}
          {cvData.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{cvData.phone}</span>
            </div>
          )}
          {cvData.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{cvData.location}</span>
            </div>
          )}
          {cvData.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{cvData.website}</span>
            </div>
          )}
          {cvData.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{cvData.linkedin}</span>
            </div>
          )}
          {cvData.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{cvData.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {cvData.summary && (
        <section className="mb-8">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Resumo Profissional
          </h3>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <section className="mb-8">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Experiência Profissional
          </h3>
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: primaryColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-semibold">{exp.position}</h4>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
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
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Educação
          </h3>
          <div className="space-y-4">
            {cvData.education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: primaryColor }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">
                      {edu.degree} em {edu.field}
                    </h4>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500">
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
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              Habilidades
            </h3>
            <div className="space-y-3">
              {cvData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}</span>
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

        {/* Languages */}
        {cvData.languages.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              Idiomas
            </h3>
            <div className="space-y-3">
              {cvData.languages.map((language, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm text-gray-600">
                      {language.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: primaryColor,
                        width:
                          language.level === "Básico"
                            ? "25%"
                            : language.level === "Intermediário"
                            ? "50%"
                            : language.level === "Avançado"
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
      </div>

      {/* Certifications */}
      {cvData.certifications.length > 0 && (
        <section className="mt-8">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Certificações
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.certifications.map((cert, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: primaryColor }}
              >
                <h4 className="font-semibold">{cert.name}</h4>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
