import {TechCategory} from "@prisma/client";

export interface Project {
  id: number;
  name: string;
  description: string | null;
  deployUrl: string | null;
  frontendUrl: string | null;
  backendUrl: string | null;
  images: string[];
  technologies: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ProjectEdidFields {
  id: number;
  name?: string;
  description?: string;
  deployUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  images?: string[];
  technologies?: string[];
}

export interface LanguageEdidFields {
  name?: string;
  categories?: TechCategory[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
