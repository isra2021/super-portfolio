"use client";

import {useEffect, useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form} from "@/components/ui/form";
import {editLanguage} from "@/app/lib/actions";

import {LanguageFormSchema, LanguageFormValues} from "@/app/lib/forms/language-config";
import {LanguageEdidFields} from "@/app/lib/definitions";
import {useFormState} from "react-dom";

import {EditButton} from "@/app/ui/buttons";
import {Actions} from "@/app/ui/buttons";
import {formFields} from "@/app/lib/forms/language-config";

interface EditFormProps extends LanguageEdidFields {
  id: number;
}

export default function LanguageEditForm({id, name, categories}: EditFormProps) {
  const [pending, startTransaction] = useTransition();
  const [edit, setEdit] = useState(true);

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(LanguageFormSchema),
    defaultValues: {
      name: name || "",
      categories: categories || [],
    },
    mode: "onChange",
  });

  const handleEdit = () => {
    if (!edit) {
      form.reset();
    }
    setEdit(!edit);
  };

  const editLanguageWithId = editLanguage.bind(null, id);
  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState(editLanguageWithId, initialState);

  const items = [
    {id: "FRONTEND", label: "Frontend"},
    {id: "BACKEND", label: "Backend"},
  ];

  function onSubmit(data: LanguageFormValues) {
    startTransaction(() => {
      const dirtyValues = Object.keys(form.formState.dirtyFields).map((key) => {
        return {
          [key]: data[key as keyof LanguageFormValues],
        };
      });

      dispatch(Object.assign({}, ...dirtyValues));
    });
  }

  useEffect(() => {
    if (!state) return;

    Object.keys(state.errors).forEach((path) => {
      const errorMessage = state.errors[path];
      form.setError(path as keyof LanguageFormValues, {
        message: errorMessage,
      });
    });
  }, [state, form]);

  return (
    <div className='flex flex-col'>
      <EditButton edit={edit} onClick={handleEdit} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {formFields.map(({component: Component, name, ...field}) => (
            <Component
              key={name}
              name={name}
              {...field}
              control={form.control}
              errors={form.formState.errors}
              disabled={edit}
              {...(name === "categories" ? {items} : {})}
            />
          ))}

          {form.formState.isDirty && form.formState.isValid && (
            <Actions pending={pending} onClick={() => form.reset()} />
          )}
        </form>
      </Form>
    </div>
  );
}
