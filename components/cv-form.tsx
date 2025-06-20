"use client";

import type React from "react";

import { useState } from "react";
import type { CVData } from "@/lib/cv-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface CVFormProps {
  cvData: CVData;
  onDataChange: (data: CVData) => void;
}

export function CVForm({ cvData, onDataChange }: CVFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""));
  };

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...cvData, [field]: value };
    onDataChange(newData);

    // Validate fields
    const newErrors = { ...errors };

    if (field === "email" && value && !validateEmail(value)) {
      newErrors.email = "Email inválido";
    } else if (field === "email") {
      delete newErrors.email;
    }

    if (field === "phone" && value && !validatePhone(value)) {
      newErrors.phone = "Telefone inválido";
    } else if (field === "phone") {
      delete newErrors.phone;
    }

    if (field === "fullName" && !value.trim()) {
      newErrors.fullName = "Nome é obrigatório";
    } else if (field === "fullName") {
      delete newErrors.fullName;
    }

    setErrors(newErrors);
  };

  const handleArrayChange = (
    field: keyof CVData,
    index: number,
    value: any
  ) => {
    const array = cvData[field] as any[];
    const newArray = [...array];
    newArray[index] = value;
    onDataChange({ ...cvData, [field]: newArray });
  };

  const addArrayItem = (field: keyof CVData, defaultItem: any) => {
    const array = cvData[field] as any[];
    onDataChange({ ...cvData, [field]: [...array, defaultItem] });
  };

  const removeArrayItem = (field: keyof CVData, index: number) => {
    const array = cvData[field] as any[];
    const newArray = array.filter((_, i) => i !== index);
    onDataChange({ ...cvData, [field]: newArray });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("photo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-[var(--color-text-dark)]">
          Informações Pessoais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-[var(--color-text-dark)]">
              Nome Completo *
            </Label>
            <Input
              id="fullName"
              value={cvData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`border-[var(--color-border)] focus:border-[var(--color-focus)] ${
                errors.fullName ? "border-red-500" : ""
              }`}
              placeholder="Seu nome completo"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="jobTitle" className="text-[var(--color-text-dark)]">
              Cargo/Profissão
            </Label>
            <Input
              id="jobTitle"
              value={cvData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
              placeholder="Ex: Desenvolvedor Frontend"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="photo" className="text-[var(--color-text-dark)]">
            Foto do Perfil
          </Label>
          <div className="flex items-center gap-4 mt-2">
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
            />
            {cvData.photo && (
              <img
                src={cvData.photo || "/placeholder.svg"}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-border)]"
              />
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="summary" className="text-[var(--color-text-dark)]">
            Resumo Profissional
          </Label>
          <Textarea
            id="summary"
            value={cvData.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
            className="border-[var(--color-border)] focus:border-[var(--color-focus)] min-h-[100px]"
            placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-[var(--color-text-dark)]">
          Contato
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-[var(--color-text-dark)]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={cvData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`border-[var(--color-border)] focus:border-[var(--color-focus)] ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-[var(--color-text-dark)]">
              Telefone
            </Label>
            <Input
              id="phone"
              value={cvData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`border-[var(--color-border)] focus:border-[var(--color-focus)] ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-[var(--color-text-dark)]">
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={cvData.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
              placeholder="linkedin.com/in/seuperfil"
            />
          </div>

          <div>
            <Label htmlFor="github" className="text-[var(--color-text-dark)]">
              GitHub
            </Label>
            <Input
              id="github"
              value={cvData.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
              placeholder="github.com/seuusuario"
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-[var(--color-text-dark)]">
              Website/Portfolio
            </Label>
            <Input
              id="website"
              value={cvData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
              placeholder="www.seusite.com"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-[var(--color-text-dark)]">
              Localização
            </Label>
            <Input
              id="location"
              value={cvData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
              placeholder="São Paulo, SP"
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-[var(--color-text-dark)]">
            Experiência Profissional
          </h3>
          <Button
            onClick={() =>
              addArrayItem("experience", {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
                current: false,
              })
            }
            size="sm"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-focus)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {cvData.experience.map((exp, index) => (
          <Card key={index} className="p-4 border-[var(--color-border)]">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-[var(--color-text-dark)]">
                Experiência {index + 1}
              </h4>
              <Button
                onClick={() => removeArrayItem("experience", index)}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[var(--color-text-dark)]">Empresa</Label>
                <Input
                  value={exp.company}
                  onChange={(e) =>
                    handleArrayChange("experience", index, {
                      ...exp,
                      company: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">Cargo</Label>
                <Input
                  value={exp.position}
                  onChange={(e) =>
                    handleArrayChange("experience", index, {
                      ...exp,
                      position: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Seu cargo"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">
                  Data de Início
                </Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleArrayChange("experience", index, {
                      ...exp,
                      startDate: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">
                  Data de Fim
                </Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleArrayChange("experience", index, {
                      ...exp,
                      endDate: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  disabled={exp.current}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) =>
                      handleArrayChange("experience", index, {
                        ...exp,
                        current: e.target.checked,
                        endDate: e.target.checked ? "" : exp.endDate,
                      })
                    }
                    className="mr-2"
                  />
                  <Label
                    htmlFor={`current-${index}`}
                    className="text-sm text-[#6e5848]"
                  >
                    Trabalho atual
                  </Label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-[var(--color-text-dark)]">Descrição</Label>
              <Textarea
                value={exp.description}
                onChange={(e) =>
                  handleArrayChange("experience", index, {
                    ...exp,
                    description: e.target.value,
                  })
                }
                className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                placeholder="Descreva suas responsabilidades e conquistas..."
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-[var(--color-text-dark)]">
            Educação
          </h3>
          <Button
            onClick={() =>
              addArrayItem("education", {
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                current: false,
              })
            }
            size="sm"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-focus)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {cvData.education.map((edu, index) => (
          <Card key={index} className="p-4 border-[var(--color-border)]">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-[var(--color-text-dark)]">
                Educação {index + 1}
              </h4>
              <Button
                onClick={() => removeArrayItem("education", index)}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[var(--color-text-dark)]">
                  Instituição
                </Label>
                <Input
                  value={edu.institution}
                  onChange={(e) =>
                    handleArrayChange("education", index, {
                      ...edu,
                      institution: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Nome da instituição"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">Grau</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayChange("education", index, {
                      ...edu,
                      degree: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Ex: Bacharelado, Mestrado"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">
                  Área de Estudo
                </Label>
                <Input
                  value={edu.field}
                  onChange={(e) =>
                    handleArrayChange("education", index, {
                      ...edu,
                      field: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Ex: Ciência da Computação"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">Período</Label>
                <div className="flex gap-2">
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleArrayChange("education", index, {
                        ...edu,
                        startDate: e.target.value,
                      })
                    }
                    className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  />
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleArrayChange("education", index, {
                        ...edu,
                        endDate: e.target.value,
                      })
                    }
                    className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                    disabled={edu.current}
                  />
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`edu-current-${index}`}
                    checked={edu.current}
                    onChange={(e) =>
                      handleArrayChange("education", index, {
                        ...edu,
                        current: e.target.checked,
                        endDate: e.target.checked ? "" : edu.endDate,
                      })
                    }
                    className="mr-2"
                  />
                  <Label
                    htmlFor={`edu-current-${index}`}
                    className="text-sm text-[#6e5848]"
                  >
                    Em andamento
                  </Label>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-[var(--color-text-dark)]">
            Habilidades
          </h3>
          <Button
            onClick={() =>
              addArrayItem("skills", { name: "", level: "Intermediário" })
            }
            size="sm"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-focus)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.skills.map((skill, index) => (
            <Card key={index} className="p-4 border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    handleArrayChange("skills", index, {
                      ...skill,
                      name: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Nome da habilidade"
                />
                <Button
                  onClick={() => removeArrayItem("skills", index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <select
                value={skill.level}
                onChange={(e) =>
                  handleArrayChange("skills", index, {
                    ...skill,
                    level: e.target.value,
                  })
                }
                className="w-full p-2 border border-[var(--color-border)] rounded-md focus:border-[var(--color-focus)] focus:outline-none"
              >
                <option value="Básico">Básico</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
                <option value="Especialista">Especialista</option>
              </select>
            </Card>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-[var(--color-text-dark)]">
            Idiomas
          </h3>
          <Button
            onClick={() =>
              addArrayItem("languages", { name: "", level: "Intermediário" })
            }
            size="sm"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-focus)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.languages.map((language, index) => (
            <Card key={index} className="p-4 border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={language.name}
                  onChange={(e) =>
                    handleArrayChange("languages", index, {
                      ...language,
                      name: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Nome do idioma"
                />
                <Button
                  onClick={() => removeArrayItem("languages", index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <select
                value={language.level}
                onChange={(e) =>
                  handleArrayChange("languages", index, {
                    ...language,
                    level: e.target.value,
                  })
                }
                className="w-full p-2 border border-[var(--color-border)] rounded-md focus:border-[var(--color-focus)] focus:outline-none"
              >
                <option value="Básico">Básico</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
                <option value="Fluente">Fluente</option>
                <option value="Nativo">Nativo</option>
              </select>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-[var(--color-text-dark)]">
            Certificações
          </h3>
          <Button
            onClick={() =>
              addArrayItem("certifications", {
                name: "",
                issuer: "",
                date: "",
                url: "",
              })
            }
            size="sm"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-focus)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {cvData.certifications.map((cert, index) => (
          <Card key={index} className="p-4 border-[var(--color-border)]">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-[var(--color-text-dark)]">
                Certificação {index + 1}
              </h4>
              <Button
                onClick={() => removeArrayItem("certifications", index)}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[var(--color-text-dark)]">
                  Nome da Certificação
                </Label>

                <Input
                  value={cert.name}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, {
                      ...cert,
                      name: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Nome da certificação"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">Emissor</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, {
                      ...cert,
                      issuer: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Quem emitiu"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">Data</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, {
                      ...cert,
                      date: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                />
              </div>

              <div>
                <Label className="text-[var(--color-text-dark)]">
                  URL (opcional)
                </Label>
                <Input
                  value={cert.url}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, {
                      ...cert,
                      url: e.target.value,
                    })
                  }
                  className="border-[var(--color-border)] focus:border-[var(--color-focus)]"
                  placeholder="Link para verificação"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
