import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Input, SelectInput, TextInput } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateEvent } from "../../hooks/tanstack/useEvents";
import ImageUploader from "../shared/ImageUploader";
import { getImgToB64 } from "../../lib/utils";

const EventPostForm = ({ open, setOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync, isPending } = useCreateEvent();

  // Formik setup
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      event_name: "",
      organizer: "",
      location: "",
      description: "",
      eventType: "Online",
      start_date: "",
      start_time: "",
      email: "",
      image: [],
    },
    validationSchema: Yup.object({
      event_name: Yup.string().required("Event name is required."),
      organizer: Yup.string().required("Organizer name is required."),
      location: Yup.string().required("Location is required."),
      description: Yup.string().required("Description is required."),
      eventType: Yup.string().required("Please select an event type."),
      start_date: Yup.date()
        .required("Start date is required.")
        .typeError("Invalid date."),
      start_time: Yup.string()
        .required("Start time is required.")
        .typeError("Invalid time."),
      email: Yup.string()
        .email("Invalid email address.")
        .required("Contact email is required."),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const payload = {
          event_name: values.event_name,
          organizer: values.organizer,
          location: values.location,
          description: values.description,
          eventType: values.eventType,
          start_date: values.start_date,
          start_time: values.start_time,
          email: values.email,
          event_type: values.eventType,
          date: values.start_date,
          image: values.image[0],
        };

        // Simulate API call to create an event
        const res = await mutateAsync(payload);

        enqueueSnackbar(res?.message || "Event posted successfully!", {
          variant: "default",
        });

        resetForm();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar(error?.message || "Something went wrong.", {
          variant: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleUpload = async (files) => {
    // In a real application, you would upload these files to your server or cloud storage
    console.log("Files to upload:", files);

    const b64 = await Promise.all(files.map(getImgToB64));

    setFieldValue("image", b64);

    return;
  };

  const handleRemove = (index) => {
    setFieldValue("image", (prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="bg-white dark:shadow-gray-900 bg-[--core-bg] dark:bg-[--sidebar-bg] rounded-lg p-5">
      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <Input
          name="event_name"
          placeholder="Event Name"
          value={values.event_name}
          onChange={handleChange}
          error={errors.event_name}
          touched={touched.event_name}
          className="mt-0"
        />

        {/* Organizer */}
        <Input
          name="organizer"
          placeholder="Organizer Name"
          value={values.organizer}
          onChange={handleChange}
          error={errors.organizer}
          touched={touched.organizer}
          className="mt-5"
        />

        {/* Location */}
        <Input
          name="location"
          placeholder="Event Location"
          value={values.location}
          onChange={handleChange}
          error={errors.location}
          touched={touched.location}
          className="mt-5"
        />

        {/* Description */}
        <TextInput
          name="description"
          placeholder="Event Description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
          className="mt-5 min-h-28"
        />

        {/* Event Type */}
        <SelectInput 
          name="eventType"
          value={values.eventType}
          onChange={(e) => setFieldValue("eventType", e.target.value)}
          options={[
            { value: "Online", label: "Online" },
            { value: "In-Person", label: "In-Person" },
            { value: "Hybrid", label: "Hybrid" },
          ]}
          error={errors.eventType}
          touched={touched.eventType}
          className="mt-5 dark:bg-[--sidebar-bg]"
        />

        {/* Start Date */}
        <Input
          name="start_date"
          type="date"
          placeholder="Start Date"
          value={values.start_date}
          onChange={handleChange}
          error={errors.start_date}
          touched={touched.start_date}
          className="mt-5"
        />

        {/* Start Time */}
        <Input
          name="start_time"
          type="time"
          placeholder="Start Time"
          value={values.start_time}
          onChange={handleChange}
          error={errors.start_time}
          touched={touched.start_time}
          className="mt-5"
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          placeholder="Contact Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
          className="mt-5 border"
        />

        {/* image */}
        <div className="mt-5 px-3">
          <ImageUploader
            onUpload={handleUpload}
            onRemove={handleRemove}
            maxFiles={1}
            maxSizeMB={10}
            acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
            label="Event Image"
            description="Drag and drop your images here or click to browse"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          className="mt-5 w-full text-white bg-[--secondary-bg] hover:bg-[--secondary-bg]/90 duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Event"}
        </Button>
      </form>
    </div>
  );
};

export default EventPostForm;
