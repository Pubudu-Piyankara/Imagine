"use client";
import React, { useTransition } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deleteImage } from '@/lib/actions/image.actions';
import { Button } from '../ui/button';

type Props = {}

const DeleteItem = ({ imageId }: { imageId: string }) => {
    const [isPending, startTransition] = useTransition();
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild className="w-full rounded-full ">
          <Button
            type="button"
            className="bg-red-600 bg-cover ml-4 rounded-full py-4 px-6 p-16-semibold h-[50px] w-72 md:h-[54px] capitalize hover:bg-blue-900"
            variant="destructive"
          >
            Delete Image
          </Button>
        </AlertDialogTrigger>
  
        <AlertDialogContent className="flex flex-col gap-10">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this image?
            </AlertDialogTitle>
            <AlertDialogDescription className="p-16-regular">
              This will permanently delete this image
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="border bg-red-500 text-white hover:bg-red-600"
              onClick={() =>
                startTransition(async () => {
                  await deleteImage(imageId);
                })
              }
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

export default DeleteItem