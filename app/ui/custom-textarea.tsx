import {Control, FieldErrors} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";
import {FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl} from "@/components/ui/form";

interface CustomInputProps {
  name: string;
  label: string;
  description?: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
}

export default function CustomTextarea({name, label, description, control, errors, disabled}: CustomInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea disabled={disabled} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
