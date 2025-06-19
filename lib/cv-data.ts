export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Skill {
  name: string
  level: string
}

export interface Language {
  name: string
  level: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url: string
}

export interface CVData {
  fullName: string
  jobTitle: string
  photo: string
  summary: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
}

export const defaultCVData: CVData = {
  fullName: "",
  jobTitle: "",
  photo: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
}
