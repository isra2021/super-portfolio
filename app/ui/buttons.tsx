import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";

export function EditButton({edit, onClick}: {edit: boolean; onClick: () => void}) {
  return (
    <Button variant='secondary' className='ml-auto' onClick={onClick}>
      {edit ? "Edit" : "Cancel"}
    </Button>
  );
}

export function SubmitButton({name, pendingName, pending}: {name: string; pendingName: string; pending: boolean}) {
  return (
    <Button disabled={pending} type='submit'>
      {pending && <Loader className='animate-spin mr-2' />}
      {pending ? pendingName : name}
    </Button>
  );
}

export function Actions({pending, onClick}: {pending: boolean; onClick: () => void}) {
  return (
    <div className='flex gap-4 mt-8'>
      <SubmitButton name='Save' pendingName='Saving...' pending={pending} />
      <Button disabled={pending} variant='secondary' type='button' onClick={onClick}>
        Cancel
      </Button>
    </div>
  );
}
