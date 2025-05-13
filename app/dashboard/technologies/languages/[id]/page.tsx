import {getLanguageById} from "@/app/lib/actions";
import {notFound} from "next/navigation";
import LanguageEditForm from "@/app/ui/dashboard/technologies/forms/language-edit-form";

export default async function Page({params}: {params: {id: string}}) {
  const id = parseInt(params.id, 10);
  const language = await getLanguageById(id);

  if (!language) {
    return notFound();
  }

  return <LanguageEditForm {...language} id={language.id} />;
}
