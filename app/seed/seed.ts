import prisma from "@/prisma/client";
import {programmingLanguages} from "@/app/lib/placeholder-data";

export async function seedProgrammingLanguages(): Promise<void> {
  try {
    await prisma.programmingLanguage.deleteMany({});
    const insertProgrammingLanguages = await prisma.programmingLanguage.createMany({
      data: programmingLanguages,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertProgrammingLanguages.count} programming languages`);
  } catch (error) {
    console.error("Error seeding programming languages:", error);
    throw error;
  }
}
