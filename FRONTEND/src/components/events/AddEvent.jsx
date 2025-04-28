"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Plus } from "lucide-react";
import EventPostForm from "./EventForm";

export function AddEvent() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button
          id="add-event"
          className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg] hover:text-[--secondary-text] dark:hover:text-[--base-text] duration-200 px-5"
        >
          <span>Add Event</span>
          <Plus size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] max-h-[90vh] overflow-y-auto border-black bg-gray-100 dark:shadow-gray-900 bg-[--core-bg] dark:bg-[--sidebar-bg] dark:text-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Add an Event</DialogTitle>
          <DialogDescription>
            Add an event to your event portal.
          </DialogDescription>
        </DialogHeader>

        <EventPostForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
