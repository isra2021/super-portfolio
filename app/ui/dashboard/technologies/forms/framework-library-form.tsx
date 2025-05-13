"use client";

import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";

import {FrameworkLibraryFormSchema, FrameworkLibraryFormValues} from "@/app/lib/schemas";

import CheckboxSelector from "../checkbox-selector";
import {item} from "../checkbox-selector";

const categories: Array<item> = [
  {
    id: "FRONTEND",
    label: "Frontend",
  },
  {
    id: "BACKEND",
    label: "Backend",
  },
];

interface FrameworkLibraryProps {
  languages: Array<item>;
}

export default function FrameworkLibraryForm({languages}: FrameworkLibraryProps) {
  const form = useForm<FrameworkLibraryFormValues>({
    resolver: zodResolver(FrameworkLibraryFormSchema),
    defaultValues: {
      name: "",
      categories: [],
      languages: [],
    },
  });

  function onSubmit(data: FrameworkLibraryFormValues) {
    console.log("SUBMIT DATA:", data);
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
        <CheckboxSelector items={languages} control={form.control} name='languages' />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
