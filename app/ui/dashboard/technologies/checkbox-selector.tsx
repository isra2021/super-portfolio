import {Control, FieldErrors} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

export interface Item {
  id: string | number;
  label: string;
}

interface CheckboxSelectorProps {
  name: string;
  label: string;
  description?: string;
  items: Item[];
  control: Control<any>;
  errors: FieldErrors;
  disabled?: boolean;
}

export default function CheckboxSelector({
  name,
  label,
  description,
  items = [],

  control,
  errors,
  disabled,
}: CheckboxSelectorProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className='mb-4'>
            <FormLabel>{label}</FormLabel>
          </div>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({field}) => {
                return (
                  <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        disabled={disabled}
                        checked={field.value.includes(item.id)}
                        onCheckedChange={(checked) => {
                          let newValue;
                          if (checked) {
                            newValue = [...field.value, item.id];
                          } else {
                            newValue = field.value.filter((value: string | number) => value !== item.id);
                          }

                          newValue.sort((a, b) => {
                            const indexA = items.findIndex((i) => i.id === a);
                            const indexB = items.findIndex((i) => i.id === b);
                            return indexA - indexB;
                          });
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          {description && <FormDescription>{description}</FormDescription>}
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
