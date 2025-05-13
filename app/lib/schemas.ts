import {z} from "zod";
import {TechCategory} from "@prisma/client";

export const LanguageFormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  categories: z.array(z.nativeEnum(TechCategory)).min(1, {message: "You must select at least one category"}),
});

export type ProgrammingLanguageFormValues = z.infer<typeof LanguageFormSchema>;
