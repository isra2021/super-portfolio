"use client";

import {useRef, useState, useEffect} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Loader} from "lucide-react";

import {useFormState} from "react-dom";
import {createProject} from "@/app/lib/actions";
import {State} from "@/app/lib/actions";
import {useToast} from "@/components/ui/use-toast";
import {useTransition} from "react";

import ImageUploadField from "@/app/ui/dashboard/image-upload-field";

const urlOrEmpty = z.union([z.string().url(), z.string().length(0)]);
const createProjectFormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  description: z.string().min(1, {message: "Description is required"}),
  deployUrl: urlOrEmpty.optional(),
  frontendUrl: urlOrEmpty.optional(),
  backendUrl: urlOrEmpty.optional(),
  images: z.array(z.string()).min(1, {message: "At least one image required"}),
  technologies: z.string().min(1, {message: "At least one technology is required"}),
});
export type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

export default function Page() {
  const [pending, startTransition] = useTransition();
  const {toast} = useToast();

  const initialState: State = {message: null, errors: {}};
  const [state, dispatch] = useFormState(createProject, initialState);

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      deployUrl: "",
      frontendUrl: "",
      backendUrl: "",
      images: [],
      technologies: "",
    },
  });

  function onSubmit(data: CreateProjectFormValues) {
    startTransition(async () => {
      dispatch(data);
    });

    if (state.message === "Success") {
      toast({
        description: "Your message has been sent.",
      });
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
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the name of your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({field}) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Provide a brief description of your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='deployUrl'
          render={({field}) => (
            <FormItem>
              <FormLabel>Deploy URL</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>Enter the URL where your project is deployed (if applicable).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='backendUrl'
          render={({field}) => (
            <FormItem>
              <FormLabel>Backend URL</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>Enter the URL for the backend of your project (if applicable).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='frontendUrl'
          render={({field}) => (
            <FormItem>
              <FormLabel>Frontend URL</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>Enter the URL for the frontend of your project (if applicable).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='images'
          render={({field}) => <ImageUploadField field={field} form={form} />}
        />

        <FormField
          control={form.control}
          name='technologies'
          render={({field}) => (
            <FormItem>
              <FormLabel>Technologies *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>List the technologies used in your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={pending} type='submit'>
          {pending && <Loader className='animate-spin mr-2' />}
          {pending ? "Submitting..." : "Create project"}
        </Button>
      </form>
    </Form>
  );
}
