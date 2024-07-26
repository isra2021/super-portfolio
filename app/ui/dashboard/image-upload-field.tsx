"use client";

import {useState, useEffect, RefObject, useRef} from "react";
import {Cross2Icon} from "@radix-ui/react-icons";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Upload} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {ControllerRenderProps, UseFormReturn} from "react-hook-form";

interface ImageUploadFieldProps {
  field: ControllerRenderProps<any, "images">;
  form: UseFormReturn<any>;
}

const ImageUploadField = ({field, form}: ImageUploadFieldProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [open, setOpen] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <FormItem>
      <FormLabel>Images *</FormLabel>
      <FormControl>
        <input
          ref={fileRef}
          className='hidden'
          type='file'
          onChange={async (e) => {
            const fileList = e.target.files;
            if (fileList && fileList.length > 0) {
              const filesArray = Array.from(fileList);
              const base64Array = await Promise.all(filesArray.map(fileToBase64));
              const currentImages = form.getValues("images") || [];

              const updatedImages = [...currentImages, ...base64Array];
              form.setValue("images", updatedImages);
              field.onChange(updatedImages);
            }
          }}
          multiple
          accept='image/png'
        />
      </FormControl>

      <div className={`grid gap-2 max-w-[600px]  grid-rows-auto  `}>
        {field.value && field.value.length > 0 ? (
          <>
            <Image
              alt='Project image'
              className='aspect-square rounded-md object-cover w-full'
              src={field.value[0]}
              height={300}
              width={300}
            />

            <div className='grid grid-cols-3 gap-2'>
              {field.value
                .slice(1, field.value.length > 2 ? 2 : field.value.length)
                .map((img: string, index: number) => (
                  <Image
                    key={index}
                    alt={`image-${index + 1}`}
                    className='aspect-square rounded-md w-full object-cover'
                    height={200}
                    src={img}
                    width={200}
                  />
                ))}
              {field.value.length > 2 && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className='h-full' variant='outline'>
                      + {field.value.length}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col justify-center items-center'>
                      <Carousel setApi={setApi} className='w-full max-w-xs'>
                        <CarouselContent>
                          {field.value.map((src: string, index: number) => (
                            <CarouselItem key={index} className='flex flex-col justify-center items-center '>
                              <CardContent className='flex aspect-square items-center justify-center p-6 relative'>
                                <Cross2Icon className='absolute right-1 top-1' />
                                <Image
                                  src={src}
                                  width={200}
                                  height={200}
                                  alt={`Image ${index + 1}`}
                                  className='w-full'
                                />
                              </CardContent>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      <div className='py-2 text-center text-sm text-muted-foreground'>
                        Slide {current} of {count}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div
                onClick={handleFile}
                className='w-full flex items-center justify-center rounded-md border border-dashed aspect-square'>
                <Upload className='h-4 w-4 text-muted-foreground' />
                <span className='sr-only'>Upload</span>
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={handleFile}
            className='w-full aspect-square flex items-center justify-center rounded-md border border-dashed'>
            <Upload className='h-4 w-4 text-muted-foreground' />
            <span className='sr-only'>Upload</span>
          </div>
        )}
      </div>

      <FormDescription>Please upload images for your project. You can add multiple images if needed.</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
export default ImageUploadField;
