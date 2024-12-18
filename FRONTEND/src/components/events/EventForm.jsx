import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Input, SelectInput, TextInput } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateEvent } from "@/hooks/tanstack/useEvents";

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
      end_date: "",
      email: "",
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
      end_date: Yup.date()
        .required("End date is required.")
        .typeError("Invalid date."),
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
          end_date: values.end_date,
          email: values.email,
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

  return (
    <div className="bg-white rounded-lg p-5">
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
          className="mt-5"
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

        {/* End Date */}
        <Input
          name="end_date"
          type="date"
          placeholder="End Date"
          value={values.end_date}
          onChange={handleChange}
          error={errors.end_date}
          touched={touched.end_date}
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
