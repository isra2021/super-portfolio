"use client";

import {useEffect, useTransition} from "react";
import {useFormState} from "react-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormField} from "@/components/ui/form";
import {createProject} from "@/app/lib/actions";

import {ProjectFormSchema, ProjectFormValues, formFields} from "@/app/lib/forms/project-config";
import ImageUploadField from "../../image-upload-field";
import CheckboxSelector from "../../technologies/checkbox-selector";
import {SubmitButton} from "@/app/ui/buttons";

export default function ProjectCreateForm({
  frontend,
  backend,
}: {
  frontend: Record<string, Array<{id: number; label: string}>>;
  backend: Record<string, Array<{id: number; label: string}>>;
}) {
  const [pending, startTransaction] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      deployUrl: "",
      frontendUrl: "",
      backendUrl: "",
      images: [],
      languagesFrontend: [],
      languagesBackend: [],
      frameworksLibrariesFrontend: [],
      frameworksLibrariesBackend: [],
      databases: [],
    },
    mode: "onChange",
  });

  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState(createProject, initialState);

  function onSubmit(data: ProjectFormValues) {
    startTransaction(() => {
      dispatch(data);
    });
  }

  /* useEffect(() => {
    if (!state) return;

    Object.keys(state.errors).forEach((path) => {
      const errorMessage = state.errors[path];
      form.setError(path as keyof ProjectFormValues, {
        message: errorMessage,
      });
    });
  }, [state, form]); */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {formFields.map(({component: Component, name, ...field}) => (
          <Component key={name} name={name} {...field} control={form.control} errors={form.formState.errors} />
        ))}
        <FormField
          control={form.control}
          name='images'
          render={({field}) => <ImageUploadField field={field} form={form} />}
        />

        <CheckboxSelector
          label='Languages Frontend'
          items={frontend.languages}
          description='Select the programming languages used in Frontend development.'
          name='languagesFrontend'
          control={form.control}
          errors={form.formState.errors}
        />

        <CheckboxSelector
          label='Languages Backend'
          items={backend.languages}
          description='Select the programming languages used in Backend development.'
          name='languagesBackend'
          control={form.control}
          errors={form.formState.errors}
        />

        <CheckboxSelector
          label='Frameworks or Libraries Frontend'
          items={frontend.frameworksLibraries}
          description='Select the frameworks or libraries used in Frontend development.'
          name='frameworksLibrariesFrontend'
          control={form.control}
          errors={form.formState.errors}
        />

        <CheckboxSelector
          label='Frameworks or Libraries Backend'
          items={backend.frameworksLibraries}
          description='Select the frameworks or libraries used in Backend development.'
          name='frameworksLibrariesBackend'
          control={form.control}
          errors={form.formState.errors}
        />

        <CheckboxSelector
          label='Databases'
          items={backend.databases}
          description='Select the databases used in Backend development.'
          name='databases'
          control={form.control}
          errors={form.formState.errors}
        />

        {form.formState.isValid && <SubmitButton name='Create' pendingName='Creating...' pending={pending} />}
      </form>
    </Form>
  );
}
