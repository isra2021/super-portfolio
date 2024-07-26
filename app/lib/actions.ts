"use server";

import prisma from "@/prisma/client";
import {CreateProjectFormValues} from "../dashboard/projects/create/page";

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    deployUrl?: string[];
    frontendUrl?: string[];
    backendUrl?: string[];
    images?: string[];
    technologies?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: State, formData: CreateProjectFormValues): Promise<State> {
  const {technologies} = formData;
  const arrayOfTechnologies = technologies.split(", ");

  try {
    await prisma.project.create({data: {...formData, technologies: arrayOfTechnologies}});
    return {message: "Success"};
  } catch (error) {
    throw new Error("Error");
  }
}

export async function getProjects() {
  return await prisma.project.findMany();
}
