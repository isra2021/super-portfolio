import {notFound} from "next/navigation";
import {getLanguagesAndFrameworksLibraries, getProjectById} from "@/app/lib/actions";
import {Database, FrameworkLibrary, Language, TechCategory} from "@prisma/client";
import ProjectEditForm from "@/app/ui/dashboard/projects/forms/edit-form";

type Technology = Language | FrameworkLibrary | Database;

const mapId = (item: Technology): number => item.id;
const mapLabel = (item: Technology): {id: number; label: string} => ({
  id: item.id,
  label: item.name,
});

const filterAndMapIds = (techCategory: TechCategory, items: Technology[]): number[] => {
  return items.reduce((acc, item) => {
    if ("techCategories" in item && item.techCategories.includes(techCategory)) {
      acc.push(item.id);
    } else if ("techCategory" in item && item.techCategory === techCategory) {
      acc.push(item.id);
    }
    return acc;
  }, [] as number[]);
};

const filterAndMapLabels = (techCategory: TechCategory, items: Technology[]): {id: number; label: string}[] => {
  return items.reduce((acc, item) => {
    if ("techCategories" in item && item.techCategories.includes(techCategory)) {
      acc.push(mapLabel(item));
    } else if ("techCategory" in item && item.techCategory === techCategory) {
      acc.push(mapLabel(item));
    }
    return acc;
  }, [] as {id: number; label: string}[]);
};

export default async function Page({params}: {params: {id: string}}) {
  const id = parseInt(params.id, 10);

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const Projectlanguages = project.technologies?.language || [];
  const ProjectFrameworkLibraries = project.technologies?.frameworkLibrary || [];
  const ProjectDatabases = project.technologies?.database || [];

  const [languages, frameworksLibraries, databases] = await getLanguagesAndFrameworksLibraries();

  const languagesFrontend = filterAndMapIds(TechCategory.FRONTEND, Projectlanguages);
  const languagesBackend = filterAndMapIds(TechCategory.BACKEND, Projectlanguages);
  const frameworksLibrariesFrontend = filterAndMapIds(TechCategory.FRONTEND, ProjectFrameworkLibraries);
  const frameworksLibrariesBackend = filterAndMapIds(TechCategory.BACKEND, ProjectFrameworkLibraries);
  const Projectdatabases = ProjectDatabases.map(mapId);

  const backend = {
    languages: filterAndMapLabels(TechCategory.BACKEND, languages),
    frameworksLibraries: filterAndMapLabels(TechCategory.BACKEND, frameworksLibraries),
    databases: databases.map(mapLabel),
  };

  const frontend = {
    languages: filterAndMapLabels(TechCategory.FRONTEND, languages),
    frameworksLibraries: filterAndMapLabels(TechCategory.FRONTEND, frameworksLibraries),
  };

  const defaultValues = {
    name: project.name || "",
    description: project.description || "",
    deployUrl: project.deployUrl || "",
    frontendUrl: project.frontendUrl || "",
    backendUrl: project.backendUrl || "",
    images: project.images || [],
    languagesFrontend,
    languagesBackend,
    frameworksLibrariesFrontend,
    frameworksLibrariesBackend,
    databases: Projectdatabases,
  };

  return (
    <main>
      <ProjectEditForm backend={backend} frontend={frontend} defaultValues={defaultValues} />
    </main>
  );
}
