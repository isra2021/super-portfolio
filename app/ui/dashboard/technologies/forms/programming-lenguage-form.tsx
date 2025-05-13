"use client";

import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";

import {ProgrammingLanguageFormSchema, ProgrammingLanguageFormValues} from "@/app/lib/schemas";

import CheckboxSelector from "../checkbox-selector";
import {useTransition} from "react";
import {useFormState} from "react-dom";
import {createProgrammingLanguage} from "@/app/lib/actions";
import {State} from "@/app/lib/actions";
import {Loader} from "lucide-react";

const categories = [
  {
    id: "FRONTEND",
    label: "Frontend",
  },
  {
    id: "BACKEND",
    label: "Backend",
  },
];

export default function ProgrammingLenguageForm() {
  const form = useForm<ProgrammingLanguageFormValues>({
    resolver: zodResolver(ProgrammingLanguageFormSchema),
    defaultValues: {
      name: "",
      categories: [],
    },
  });

  const [pending, startTransition] = useTransition();

  const initialState: State = {message: null, errors: {}};
  const [state, dispatch] = useFormState(createProgrammingLanguage, initialState);

  function onSubmit(data: ProgrammingLanguageFormValues) {
    startTransition(async () => {
      dispatch(data);
    });
    if (state.message === "Success") {
      console.log("LAGUAGE PROGRAMMIG CREATE");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Name description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CheckboxSelector items={categories} control={form.control} name='categories' />

        <Button disabled={pending} type='submit'>
          {pending && <Loader className='animate-spin mr-2' />}
          {pending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
