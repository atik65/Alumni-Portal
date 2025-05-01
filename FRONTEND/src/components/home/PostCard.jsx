"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MessageCircle, Send } from "lucide-react";
import userPhoto from "../../../public/assets/user.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useFormik } from "formik";
import { commentSchema } from "../../validationSchema/commentSchema";
import { useCreateComment } from "../../hooks/tanstack/usePosts";
import { enqueueSnackbar } from "notistack";
import { useGetUserDetails } from "../../hooks/tanstack/useAuth";

const Comment = ({ comment }) => {
  // class CommentSerializer(serializers.ModelSerializer):
  //   user = serializers.StringRelatedField(read_only=True)

  //   class Meta:
  //       model = Comment
  //       fields = ['id', 'post', 'user', 'content', 'created_at', 'updated_at']
  //       read_only_fields = ['id', 'user', 'created_at', 'updated_at']

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 py-3"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
          className="w-full object-cover object-top"
          src={
            process.env.NEXT_PUBLIC_BACKEND_URL + comment?.user?.avatar ||
            "/placeholder.svg"
          }
          alt={comment?.user?.name}
        />
        <AvatarFallback>
          {comment?.user?.first_name?.charAt(0).toUpperCase() +
            comment?.user?.last_name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
            {comment?.user?.first_name} {comment?.user?.last_name}
            {/* <span>{comment?.user?.username}</span> */}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(comment?.created_at, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {comment?.content}
        </p>
      </div>
    </motion.div>
  );
};

const CommentForm = ({
  onSubmit,
  placeholder = "Write a comment...",
  initialValue = "",
  postId,
  open = false,
  setOpen = () => {},
  setShowComments = () => {},
}) => {
  const { mutateAsync, isPending } = useCreateComment();
  const { data: userInfo, isLoading } = useGetUserDetails();

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      content: initialValue,
    },
    validationSchema: commentSchema,
    onSubmit: async (values) => {
      const payload = {
        post: postId,
        content: values.content,
      };

      try {
        const res = await mutateAsync(payload);
        enqueueSnackbar("Comment added successfully", { variant: "default" });
        resetForm();
        setOpen(false);
        setShowComments(true);
      } catch (error) {
        enqueueSnackbar("Failed to add comment", { variant: "error" });
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start mt-2">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage
          className="w-full object-cover object-top"
          src={userInfo?.avatar || "/placeholder.svg"}
          alt="Your avatar"
        />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div className="flex-1 relative">
        <Textarea
          value={values.content}
          onChange={handleChange}
          name="content"
          placeholder={placeholder}
          className="min-h-[60px] w-full resize-none outline-none pr-10 text-sm"
        />
        {!isPending && (
          <button
            type="submit"
            className="absolute right-2 bottom-2 text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={!values.content.trim() || isPending}
          >
            <Send size={18} />
            <span className="sr-only">Send comment</span>
          </button>
        )}

        {/* if isPending then show a loading spinner */}
        {isPending && (
          <div className="absolute right-2 bottom-2 text-primary">
            <Loader2 size={18} className="animate-spin" />
          </div>
        )}
      </div>
      {/* {!errors.content && !touched.content && (
        <p className="text-xs text-red-500">{errors.content}</p>
      )} */}
    </form>
  );
};

const CommentModal = ({ postId, onCommentAdded, setShowComments }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          variant="outline"
          size="sm"
          className="gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-400"
        >
          <MessageCircle size={16} />
          <span>Add Comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md sm:max-w-[500px] lg:max-w-[700px] bg-white dark:bg-[--sidebar-bg-dark]">
        <DialogHeader>
          <DialogTitle>What's on your mind?</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <CommentForm
            open={open}
            setOpen={setOpen}
            postId={postId}
            setShowComments={setShowComments}
            placeholder="Share your thoughts on this post..."
            buttonText="Post Comment"
          />
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // if (isRolesLoading) {
  //   return (
  //     <div className="p-5 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md animate-pulse">
  //       <div className="flex items-center gap-3">
  //         <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
  //         <div className="flex-1">
  //           <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
  //           <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
  //         </div>
  //       </div>
  //       <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded mt-5"></div>
  //     </div>
  //   );
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5  bg-white dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            className="w-full object-cover object-top"
            src={
              process.env.NEXT_PUBLIC_BACKEND_URL + post?.created_by?.avatar ||
              "/placeholder.svg"
            }
            alt={post?.created_by}
          />
          <AvatarFallback>
            {post?.created_by?.first_name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {post.created_by.first_name} {post.created_by.last_name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">
            {post.created_by.role?.role_name}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-5 dark:text-gray-300">{post.post}</p>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-gray-600 dark:text-gray-300"
            onClick={toggleComments}
          >
            <MessageCircle size={18} />
            <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              {post.comments.length} Comments
            </span>
          </Button>

          <CommentModal setShowComments={setShowComments} postId={post.id} />
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 overflow-hidden"
            >
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="pr-2">
                  <CommentForm
                    postId={post.id}
                    setShowComments={setShowComments}
                  />
                </div>

                <div className="mt-4 space-y-1 divide-y divide-gray-100 dark:divide-gray-800">
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostCard;
