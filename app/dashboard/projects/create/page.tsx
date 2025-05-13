import ProjectCreateForm from "@/app/ui/dashboard/projects/forms/create-form";
import {getLanguagesAndFrameworksLibraries} from "@/app/lib/actions";
import {Database, FrameworkLibrary, Language, TechCategory} from "@prisma/client";

export default async function Page() {
  const [languages, frameworksLibraries, databases] = await getLanguagesAndFrameworksLibraries();

  const filterAndMapByCategory = (techCategory: TechCategory, items: Array<Language | FrameworkLibrary>) =>
    items.reduce((acc, item) => {
      if ("techCategories" in item && item.techCategories.includes(techCategory)) {
        acc.push({id: item.id, label: item.name});
      } else if ("techCategory" in item && item.techCategory === techCategory) {
        acc.push({id: item.id, label: item.name});
      }
      return acc;
    }, [] as Array<{id: number; label: string}>);

  const backend = {
    languages: filterAndMapByCategory(TechCategory.BACKEND, languages),
    frameworksLibraries: filterAndMapByCategory(TechCategory.BACKEND, frameworksLibraries),
    databases: databases.map((db: Database) => {
      return {id: db.id, label: db.name};
    }),
  };

  const frontend = {
    languages: filterAndMapByCategory(TechCategory.FRONTEND, languages),
    frameworksLibraries: filterAndMapByCategory(TechCategory.FRONTEND, frameworksLibraries),
  };

  return <ProjectCreateForm frontend={frontend} backend={backend} />;
}
