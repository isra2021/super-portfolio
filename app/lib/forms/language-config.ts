import {z} from "zod";
import {TechCategory} from "@prisma/client";
import CustomInput from "@/app/ui/custom-input";
import CheckboxSelector from "@/app/ui/dashboard/technologies/checkbox-selector";

const categoryValues = Object.values(TechCategory);
export const LanguageFormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}).optional(),
  categories: z
    .array(z.string())
    .nonempty({message: "You must select at least one category"})
    .refine((values) => values.every((value) => categoryValues.includes(value as TechCategory)), {
      message: "Invalid category value. Must be FRONTEND or BACKEND",
    }),
});

export type LanguageFormValues = z.infer<typeof LanguageFormSchema>;

type FieldName = keyof LanguageFormValues;

interface FormFieldConfig {
  name: FieldName;
  label: string;
  description: string;
  type?: string;
  component: React.ComponentType<any>;
}

export const formFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Name *",
    description: "Enter the name of your language.",
    type: "text",
    component: CustomInput,
  },

  {
    name: "categories",
    label: "Tech categories *",
    description: "Select categories.",
    component: CheckboxSelector,
  },
];
