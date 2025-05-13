import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
export default function Home() {
  return (
    <main className='flex flex-col justify-center items-center min-h-screen'>
      <div className='w-full h-[70px] '></div>
      <div className='w-full flex-1 p-6  '>
        <CardHeader className='flex  '>
          <div>
            <CardTitle>Project One</CardTitle>
            <CardDescription>Esta es la descripción de mi proyecto.</CardDescription>
          </div>

          <div className='flex gap-2'>
            <Button>Deploy</Button>
            <Button>Backend</Button>
            <Button>Frontend</Button>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col items-center space-y-4 '>
          <Carousel className=' w-full max-w-7xl'>
            <CarouselContent>
              {Array.from({length: 5}).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card className='h-[500px] w-full '>
                      <CardContent className='flex items-center justify-center h-full'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className='space-y-2 border border-red-500'>
            <div className='flex flex-wrap gap-2'>
              <span className='bg-gray-200 px-2 py-1 rounded'>React</span>
              <span className='bg-gray-200 px-2 py-1 rounded'>Next.js</span>
              <span className='bg-gray-200 px-2 py-1 rounded'>Tailwind CSS</span>
              <span className='bg-gray-200 px-2 py-1 rounded'>Node.js</span>
              <span className='bg-gray-200 px-2 py-1 rounded'>Prisma</span>
            </div>
          </div>
        </CardContent>
      </div>
    </main>
  );
}
