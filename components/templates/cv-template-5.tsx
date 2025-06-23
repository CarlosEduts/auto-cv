"use client";

import type { CVData } from "@/lib/cv-data";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface CVTemplate5Props {
  cvData: CVData;
  primaryColor: string;
  fontFamily: string;
}

export function CVTemplate5({
  cvData,
  primaryColor,
  fontFamily,
}: CVTemplate5Props) {
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
      <header className="text-center mb-12 relative">
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full"
          style={{ backgroundColor: primaryColor }}
        ></div>

        {cvData.photo && (
          <img
            src={cvData.photo || "/placeholder.svg"}
            alt={cvData.fullName}
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-8 border-gray-100 shadow-xl mt-8"
          />
        )}

        <h1 className="text-5xl font-bold mb-3 text-gray-800 tracking-tight">
          {cvData.fullName || "Seu Nome"}
        </h1>
        <div
          className="w-24 h-1 mx-auto mb-4 rounded-full"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <h2 className="text-2xl text-gray-600 mb-6 font-light tracking-wide">
          {cvData.jobTitle || "Sua Profissão"}
        </h2>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {cvData.email && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <Mail className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.email}</span>
            </div>
          )}
          {cvData.phone && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.phone}</span>
            </div>
          )}
          {cvData.location && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.location}</span>
            </div>
          )}
          {cvData.website && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <Globe className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.website}</span>
            </div>
          )}
          {cvData.linkedin && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <Linkedin className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.linkedin}</span>
            </div>
          )}
          {cvData.github && (
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <Github className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{cvData.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {cvData.summary && (
        <section className="mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed font-light italic">
              "{cvData.summary}"
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <section className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Experiência Profissional
            </h3>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>

          <div className="space-y-8">
            {cvData.experience.map((exp, index) => (
              <div key={index} className="text-center max-w-3xl mx-auto">
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-gray-800 mb-1">
                    {exp.position}
                  </h4>
                  <p
                    className="text-xl font-semibold mb-2"
                    style={{ color: primaryColor }}
                  >
                    {exp.company}
                  </p>
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
                {index < cvData.experience.length - 1 && (
                  <div className="mt-8 flex justify-center">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <section className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Educação</h3>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>

          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <div key={index} className="text-center max-w-2xl mx-auto">
                <h4 className="text-xl font-bold text-gray-800">
                  {edu.degree} em {edu.field}
                </h4>
                <p
                  className="text-lg font-semibold mb-1"
                  style={{ color: primaryColor }}
                >
                  {edu.institution}
                </p>
                <div className="text-sm text-gray-500 font-light">
                  {formatDate(edu.startDate)} -{" "}
                  {edu.current ? "Presente" : formatDate(edu.endDate)}
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
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Habilidades
              </h3>
              <div
                className="w-16 h-1 mx-auto rounded-full"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>

            <div className="space-y-6">
              {cvData.skills.map((skill, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3">
                    <span className="text-lg font-semibold text-gray-800">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className="w-3 h-3 rounded-full mx-1"
                        style={{
                          backgroundColor:
                            dot <=
                            (skill.level === "Básico"
                              ? 1
                              : skill.level === "Intermediário"
                              ? 3
                              : skill.level === "Avançado"
                              ? 4
                              : 5)
                              ? primaryColor
                              : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-light">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications */}
        <div className="space-y-12">
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Idiomas
                </h3>
                <div
                  className="w-16 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>

              <div className="space-y-4">
                {cvData.languages.map((language, index) => (
                  <div key={index} className="text-center">
                    <div className="font-semibold text-gray-800 mb-1">
                      {language.name}
                    </div>
                    <div
                      className="text-sm font-light"
                      style={{ color: primaryColor }}
                    >
                      {language.level}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cvData.certifications.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Certificações
                </h3>
                <div
                  className="w-16 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>

              <div className="space-y-6">
                {cvData.certifications.map((cert, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-bold text-gray-800 mb-1">
                      {cert.name}
                    </h4>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: primaryColor }}
                    >
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500 font-light">
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
