import {z} from "zod";
import CustomInput from "@/app/ui/custom-input";
import CustomTextarea from "@/app/ui/custom-textarea";

export const urlOrEmpty = z.union([z.string().url(), z.string().length(0)]);
export const ProjectFormSchema = z.object({
  name: z.string().min(1, {message: "Name is required."}),
  description: z.string().min(1, {message: "Description is required."}),
  deployUrl: urlOrEmpty.optional(),
  frontendUrl: urlOrEmpty.optional(),
  backendUrl: urlOrEmpty.optional(),
  images: z.array(z.string()).min(1, {message: "At least one image required"}),
  languagesFrontend: z.array(z.number()).optional(),
  languagesBackend: z.array(z.number()).optional(),
  frameworksLibrariesFrontend: z.array(z.number()).optional(),
  frameworksLibrariesBackend: z.array(z.number()).optional(),
  databases: z.array(z.number()).optional(),
});
export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

type FieldName = keyof ProjectFormValues;

interface FormFieldConfig {
  name: FieldName;
  label: string;
  description: string;
  component: React.ComponentType<any>;
}

export const formFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Name *",
    description: "Enter the name of your project.",
    component: CustomInput,
  },
  {
    name: "description",
    label: "Description *",
    description: "Provide a brief description of your project.",
    component: CustomTextarea,
  },
  {
    name: "deployUrl",
    label: "Deploy URL",
    description: "Enter the URL where your project is deployed.",
    component: CustomInput,
  },
  {
    name: "backendUrl",
    label: "Backend URL",
    description: "Enter the URL for the backend of your project.",
    component: CustomInput,
  },
  {
    name: "frontendUrl",
    label: "Frontend URL",
    description: "Enter the URL for the frontend of your project.",
    component: CustomInput,
  },
];
