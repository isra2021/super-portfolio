"use client";

import {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Upload, Trash2} from "lucide-react";
import {CardContent} from "@/components/ui/card";
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
  disabled?: boolean;
}

const ImageUploadField = ({field, form, disabled}: ImageUploadFieldProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
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
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);
      const base64Array = await Promise.all(filesArray.map(fileToBase64));
      const currentImages = form.getValues("images") || [];
      const updatedImages = [...currentImages, ...base64Array];
      form.setValue("images", updatedImages);
      field.onChange(updatedImages);
      setCount(getCount(form.getValues("images")));
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...field.value];
    updatedImages[index] = undefined;
    form.setValue("images", updatedImages);
    field.onChange(updatedImages);
    const newCount = getCount(updatedImages);
    setCount(newCount);

    if (current >= newCount) {
      setCurrent(newCount > 0 ? newCount - 1 : 0);
    }
  };

  function getCount(images: Array<string | undefined>) {
    return images.filter((src) => src !== undefined).length;
  }

  useEffect(() => {
    if (!open || count < 3) setCurrent(0);
  }, [open, count]);

  return (
    <FormItem>
      <FormLabel>Images *</FormLabel>
      <FormControl>
        <input
          disabled={disabled}
          ref={fileRef}
          className='hidden'
          type='file'
          onChange={handleFileChange}
          multiple
          accept='image/png'
        />
      </FormControl>

      <div className={`grid gap-2 max-w-[600px] grid-rows-auto`}>
        {field.value && form.getValues("images").length > 0 ? (
          <>
            {(() => {
              let firstImageIndex = 0;
              for (let index = 0; index < field.value.length; index++) {
                if (field.value[index] !== undefined) {
                  firstImageIndex = index;
                  break;
                }
              }
              return (
                <>
                  <Image
                    alt={`project image ${firstImageIndex}`}
                    className={`aspect-square rounded-md object-cover w-full ${
                      disabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    src={field.value[firstImageIndex]}
                    height={300}
                    width={300}
                  />
                  <div className='grid grid-cols-3 gap-2'>
                    {(() => {
                      for (let index = firstImageIndex + 1; index < field.value.length; index++) {
                        if (field.value[index] !== undefined) {
                          return (
                            <Image
                              key={index}
                              alt={`image-${index + 1}`}
                              className={`aspect-square rounded-md w-full object-cover ${disabled ? "opacity-50" : ""}`}
                              height={200}
                              src={field.value[index]}
                              width={200}
                            />
                          );
                        }
                      }
                    })()}

                    {count > 2 && (
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className='h-full' variant='outline'>
                            + {count - 2}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Image Gallery</DialogTitle>
                            <DialogDescription>Browse through your images.</DialogDescription>
                          </DialogHeader>
                          <div className='flex flex-col justify-center items-center'>
                            <Carousel setApi={setApi} className='w-full max-w-xs'>
                              <CarouselContent>
                                {field.value.map((src: string, index: number) => {
                                  if (src !== undefined) {
                                    return (
                                      <CarouselItem key={index} className=''>
                                        <CardContent className='flex aspect-square items-center justify-center p-6 relativev'>
                                          <div className='relative'>
                                            <Image
                                              src={src}
                                              width={200}
                                              height={200}
                                              alt={`Image ${index + 1}`}
                                              className={`w-full ${disabled ? "opacity-50" : ""}`}
                                            />
                                            <Trash2
                                              className='h-4 w-4 cursor-pointer absolute top-1 right-1 text-white'
                                              onClick={() => handleRemoveImage(index)}
                                            />
                                          </div>
                                        </CardContent>
                                      </CarouselItem>
                                    );
                                  }
                                })}
                              </CarouselContent>
                              <CarouselPrevious
                                className='hidden md:flex'
                                onClick={() => {
                                  const prevIndex = current > 0 ? current - 1 : count - 1;
                                  api && api.scrollTo(prevIndex);
                                  setCurrent(prevIndex);
                                }}
                              />
                              <CarouselNext
                                className='hidden md:flex'
                                onClick={() => {
                                  const nextIndex = current < count - 1 ? current + 1 : 0;
                                  api && api.scrollTo(nextIndex);
                                  setCurrent(nextIndex);
                                }}
                              />
                            </Carousel>
                            <div className='flex flex-col gap-2 items-center py-2 text-center text-sm text-muted-foreground'>
                              <p>
                                Slide {current + 1} of {count}
                              </p>{" "}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    <div
                      onClick={handleFile}
                      className={`w-full flex items-center justify-center rounded-md border border-dashed aspect-square ${
                        disabled ? "cursor-not-allowed opacity-50" : ""
                      }`}>
                      <Upload className='h-4 w-4 text-muted-foreground' />
                      <span className='sr-only'>Upload</span>
                    </div>
                  </div>
                </>
              );
            })()}
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
