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
