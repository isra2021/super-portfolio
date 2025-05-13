import {Skeleton} from "@/components/ui/skeleton";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export function ProjectsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          <TableHead>
            <Skeleton className='h-4 w-20' />
          </TableHead>
          <TableHead className='hidden md:table-cell'>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({length: 5}).map((_, index) => (
          <TableRow key={index} className='hover:bg-transparent'>
            <TableCell className='w-[26.5%] py-4'>
              <Skeleton className='h-4 w-1/2' />
            </TableCell>
            <TableCell className='hidden md:table-cell py-4 w-[54.5%]'>
              <Skeleton className='h-4 w-[22%]' />
            </TableCell>
            <TableCell className='py-4'>
              <Skeleton className='h-4 w-16' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function SkeletonForm() {
  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-4 w-1/4' />
      </div>

      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-4 w-1/4' />
      </div>

      {Array.from({length: 3}, (_, index) => {
        return (
          <div key={index} className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-20' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        );
      })}

      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-4 w-1/4' />
      </div>

      <div>
        <Skeleton className='h-6 w-20' />
        <div className='grid gap-2 max-w-[600px] grid-rows-auto mt-4'>
          <div className='aspect-square w-full'>
            <Skeleton className='w-full h-full rounded-md object-cover' />
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <div className='aspect-square'>
              <Skeleton className='w-full h-full rounded-md' />
            </div>
            <div className='aspect-square'>
              <Skeleton className='w-full h-full rounded-md' />
            </div>
            <div className='aspect-square'>
              <Skeleton className='w-full h-full rounded-md' />
            </div>
          </div>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>

      <Skeleton className='h-10 w-32' />
    </div>
  );
}
