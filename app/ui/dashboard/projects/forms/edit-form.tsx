"use client";

import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormField} from "@/components/ui/form";
import {editProject} from "@/app/lib/actions";

import {ProjectFormSchema, ProjectFormValues, formFields} from "@/app/lib/forms/project-config";
import ImageUploadField from "../../image-upload-field";
import CheckboxSelector from "../../technologies/checkbox-selector";
import {Actions, EditButton} from "@/app/ui/buttons";
import {useFormState} from "react-dom";

export default function ProjectEditForm({
  frontend,
  backend,
  defaultValues,
}: {
  frontend: Record<string, {id: number; label: string}[]>;
  backend: Record<string, {id: number; label: string}[]>;
  defaultValues: ProjectFormValues;
}) {
  const [pending, startTransaction] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState(editProject, initialState);
  const [edit, setEdit] = useState(true);

  function onSubmit(data: ProjectFormValues) {
    startTransaction(() => {
      dispatch(data);
    });
  }

  const handleEdit = () => {
    if (!edit) {
      form.reset();
    }
    setEdit(!edit);
  };

  return (
    <div className='flex flex-col'>
      <EditButton edit={edit} onClick={handleEdit} />

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
            description='Select the languages used in Frontend development.'
            name='languagesFrontend'
            control={form.control}
            errors={form.formState.errors}
          />

          <CheckboxSelector
            label='Languages Backend'
            items={backend.languages}
            description='Select the languages used in Backend development.'
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

          {form.formState.isDirty && form.formState.isValid && (
            <Actions pending={pending} onClick={() => form.reset()} />
          )}
        </form>
      </Form>
    </div>
  );
}
