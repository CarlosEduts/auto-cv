"use client";

import type { CVData } from "@/lib/cv-data";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface CVTemplate2Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate2({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate2Props) {
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
    <div className="max-w-4xl mx-auto bg-white flex" style={{ fontFamily }}>
      {/* Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Photo */}
        {cvData.photo && (
          <div className="text-center mb-6">
            <img
              src={cvData.photo || "/placeholder.svg"}
              alt={cvData.fullName}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white"
            />
          </div>
        )}

        {/* Contact */}
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
            CONTATO
          </h3>
          <div className="space-y-3 text-sm">
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{cvData.email}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{cvData.phone}</span>
              </div>
            )}
            {cvData.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{cvData.location}</span>
              </div>
            )}
            {cvData.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{cvData.website}</span>
              </div>
            )}
            {cvData.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{cvData.linkedin}</span>
              </div>
            )}
            {cvData.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{cvData.github}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              HABILIDADES
            </h3>
            <div className="space-y-3">
              {cvData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{skill.name}</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{
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
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              IDIOMAS
            </h3>
            <div className="space-y-2">
              {cvData.languages.map((language, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-white/80">{language.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {cvData.certifications.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              CERTIFICAÇÕES
            </h3>
            <div className="space-y-3">
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-white/80">{cert.issuer}</p>
                  <p className="text-white/60 text-xs">
                    {formatDate(cert.date)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {cvData.fullName || "Seu Nome"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {cvData.jobTitle || "Sua Profissão"}
          </h2>
        </header>

        {/* Summary */}
        {cvData.summary && (
          <section className="mb-8">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: primaryColor }}
            >
              RESUMO PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section className="mb-8">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.position}</h4>
                      <p
                        className="font-medium"
                        style={{ color: primaryColor }}
                      >
                        {exp.company}
                      </p>
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
          <section>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              EDUCAÇÃO
            </h3>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {edu.degree} em {edu.field}
                      </h4>
                      <p
                        className="font-medium"
                        style={{ color: primaryColor }}
                      >
                        {edu.institution}
                      </p>
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
      </div>
    </div>
  );
}
