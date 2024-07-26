"use client";
import {useEffect} from "react";
import {Button} from "@/components/ui/button";
export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <main className='w-full flex flex-1 flex-col items-center justify-center gap-2 border border-red-500'>
      <h2 className='text-center'>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }>
        Try again
      </Button>
    </main>
  );
}
