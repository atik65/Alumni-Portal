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
          className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-10 flex gap-2 items-center justify-center px-5 disabled:cursor-not-allowed disabled:opacity-50"
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
