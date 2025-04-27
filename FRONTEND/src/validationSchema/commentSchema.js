import * as Yup from "yup";

export const commentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});
