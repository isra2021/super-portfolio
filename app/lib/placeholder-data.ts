import {TechCategory} from "@prisma/client";

export const programmingLanguages = [
  {
    name: "JavaScript",
    categories: [TechCategory.FRONTEND, TechCategory.BACKEND],
  },
  {
    name: "Python",
    categories: [TechCategory.BACKEND],
  },
];
