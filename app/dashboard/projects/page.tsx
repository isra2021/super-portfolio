import {Suspense} from "react";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ProjectsTableSkeleton} from "@/app/ui/skeletons";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import TableComponent from "@/app/ui/dashboard/table";
import {getProjects} from "@/app/lib/actions";

export default async function Page() {
  return (
    <Tabs defaultValue='week' className='h-full'>
      <TabsContent value='week'>
        <CardHeader className='px-7'>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Recent Projects from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ProjectsTableSkeleton />}>
            <TableComponent />
          </Suspense>
        </CardContent>
      </TabsContent>
    </Tabs>
  );
}
