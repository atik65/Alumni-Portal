"use client";
import { motion } from "framer-motion";

import { SendHorizontal, Loader2 } from "lucide-react";
import { useCreatePost } from "../../hooks/tanstack/usePosts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";

const PostBox = () => {
  const { mutateAsync, isPending } = useCreatePost();

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        post: "",
      },
      validationSchema: Yup.object({
        post: Yup.string().required("Required"),
      }),
      onSubmit: async (values) => {
        try {
          const res = await mutateAsync(values);
          resetForm();

          enqueueSnackbar(res?.message || "Post created successfully", {
            variant: "default",
          });
        } catch (e) {
          const errors = Object.values(e || {}).flat();
          console.log(errors);

          enqueueSnackbar(errors[0] || "Something went wrong", {
            variant: "error",
          });
        }
      },
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="dark:m-2 "
    >
      <div className="mb-6 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="relative backdrop-blur-sm bg-white/30 dark:bg-[#1a1a2e]/80 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

          <form onSubmit={handleSubmit} className="p-1">
            <div className="relative">
              <textarea
                rows={4}
                placeholder="What's on your mind?"
                className="w-full p-4 bg-transparent ring-0 border-0 rounded-xl dark:text-white text-gray-800 outline-none resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                name="post"
                onChange={handleChange}
                value={values.post}
              ></textarea>

              {errors?.post && touched.post && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-500 px-4 pb-2"
                >
                  This field is required
                </motion.p>
              )}
            </div>

            <div className="flex justify-end w-full px-4 pb-3">
              <motion.button
                id="publish-now"
                type="submit"
                disabled={isPending}
                className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-10 flex gap-2 items-center justify-center px-5 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="relative flex items-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <span>Publish Now</span>
                      <SendHorizontal
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default PostBox;
