"use server";

import prisma from "@/prisma/client";
import {ProjectEdidFields} from "./definitions";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {ProgrammingLanguageFormValues} from "./schemas";
import {TechCategory} from "@prisma/client";
import {LanguageFormValues, LanguageFormSchema} from "./forms/language-config";
import {ProjectFormSchema, ProjectFormValues} from "./forms/project-config";

export type StateCreateProject = {
  errors?: {
    name?: string[];
    description?: string[];
    deployUrl?: string[];
    frontendUrl?: string[];
    backendUrl?: string[];
    images?: string[];
    languagesFrontend?: string[];
    languagesBackend?: string[];
    frameworksLibrariesFrontend?: string[];
    frameworksLibrariesBackend?: string[];
    databases?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: StateCreateProject, formData: ProjectFormValues): Promise<any> {
  const validateFields = ProjectFormSchema.safeParse({
    name: formData.name,
    description: formData.description,
    deployUrl: formData.deployUrl,
    frontendUrl: formData.frontendUrl,
    backendUrl: formData.backendUrl,
    images: formData.images,
    languagesFrontend: formData.languagesFrontend,
    languagesBackend: formData.languagesBackend,
    frameworksLibrariesFrontend: formData.frameworksLibrariesFrontend,
    frameworksLibrariesBackend: formData.frameworksLibrariesBackend,
    databases: formData.databases,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to Create Project.",
    };
  }

  const languages = [...(formData.languagesFrontend ?? []), ...(formData.languagesBackend ?? [])];
  const frameworkLibraries = [
    ...(formData.frameworksLibrariesFrontend ?? []),
    ...(formData.frameworksLibrariesBackend ?? []),
  ];

  const uniqueLanguages = Array.from(new Set(languages));
  const uniqueFrameworkLibraries = Array.from(new Set(frameworkLibraries));
  const databases = formData.databases ?? [];

  try {
    const project = await prisma.project.create({
      data: {
        name: formData.name,
        description: formData.description,
        deployUrl: formData.deployUrl,
        frontendUrl: formData.frontendUrl,
        backendUrl: formData.backendUrl,
        images: formData.images,
      },
    });

    await prisma.technologies.create({
      data: {
        projectId: project.id,
        frameworkLibrary: {
          connect: uniqueFrameworkLibraries.map((id: number) => ({id})),
        },
        language: {
          connect: uniqueLanguages.map((id: number) => ({id})),
        },
        database: {
          connect: databases.map((id: number) => ({id})),
        },
      },
    });
    return {message: "Success"};
  } catch (error) {
    throw new Error("Database Error: Failed to Create Project.");
  }
}

export async function editProject(prevState: StateCreateProject, formData: ProjectFormValues): Promise<any> {
  console.log("FormData:", formData);
}

export async function getProjects() {
  return await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
}

export async function getProjectById(id: number) {
  return await prisma.project.findUnique({
    where: {id},
    include: {technologies: {include: {language: true, frameworkLibrary: true, database: true}}},
  });
}

export async function createProgrammingLanguage(
  prevState: State,
  formData: ProgrammingLanguageFormValues
): Promise<State> {
  try {
    await prisma.language.create({data: formData});
  } catch (error) {
    throw new Error("Database Error: Failed to Create ProgrammingLanguage.");
  }
  return {message: "Success"};
}

export async function getLanguageById(id: number): Promise<any> {
  return await prisma.language.findUnique({where: {id}});
}

export type StateEditLanguage = {
  errors?: {
    name?: string[];
    categories?: string[];
  };
  message?: string | null;
};

export async function editLanguage(
  id: number,
  prevState: StateEditLanguage,
  formData: LanguageFormValues
): Promise<StateEditLanguage | any | undefined> {
  const validateFields = LanguageFormSchema.safeParse({
    name: formData.name,
    categories: formData.categories,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to Edit Language.",
    };
  }

  const language = await prisma.language.findUnique({where: {id}});
  if (formData.name && language?.name === formData.name) {
    return {
      errors: {name: ["Name already exists."]},
    };
  }

  try {
    await prisma.language.update({
      where: {
        id: id,
      },
      data: {
        name: formData.name && formData.name,
        categories: formData.categories && (formData.categories as TechCategory[]),
      },
    });
  } catch (error) {
    throw new Error("An unexpected error occurred. Please try again.");
  }

  revalidatePath(`/dashboard/technologies/languages/${id}`);
  return {message: "Language editing Successfuly"};
}

export async function getLanguagesAndFrameworksLibraries(): Promise<Array<any>> {
  const languages = await prisma.language.findMany();
  const frameworksLibraries = await prisma.frameworkLibrary.findMany();
  const databases = await prisma.database.findMany();

  return [languages, frameworksLibraries, databases];
}

export async function getFrameworksLibraries(): Promise<any> {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(["Nextjs", "FastAPI"]);
    }, 2000);
  });
}
