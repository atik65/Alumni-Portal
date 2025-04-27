"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import userPhoto from "../../../public/assets/user.jpg";
import { useGetRoles, useGetUserInfo } from "../../hooks/tanstack/useAlumni";
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

// Mock data for comments - replace with actual API calls
const mockComments = [
  {
    id: 1,
    user: {
      id: "user1",
      name: "Alex Johnson",
      avatar: userPhoto,
      role: "Alumni",
    },
    content: "This is really insightful! Thanks for sharing your experience.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 3,
  },
  {
    id: 2,
    user: {
      id: "user2",
      name: "Sam Rivera",
      avatar: userPhoto,
      role: "Student",
    },
    content:
      "I'd love to hear more about this topic. Could you elaborate on the second point?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 1,
  },
];

const Comment = ({ comment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 py-3"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={comment.user.avatar.src || "/placeholder.svg"}
          alt={comment.user.name}
        />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
            {comment.user.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {comment.content}
        </p>
      </div>
    </motion.div>
  );
};

const CommentForm = ({
  onSubmit,
  placeholder = "Write a comment...",
  initialValue = "",
  buttonText = "Post",
}) => {
  const [comment, setComment] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start mt-2">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage
          src={userPhoto.src || "/placeholder.svg"}
          alt="Your avatar"
        />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div className="flex-1 relative">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          className="min-h-[60px] w-full resize-none outline-none pr-10 text-sm"
        />
        <button
          type="submit"
          className="absolute right-2 bottom-2 text-primary hover:text-primary/80 transition-colors"
          disabled={!comment.trim()}
        >
          <Send size={18} />
          <span className="sr-only">Send comment</span>
        </button>
      </div>
    </form>
  );
};

const CommentModal = ({ postId, onCommentAdded }) => {
  const handleSubmit = (comment) => {
    // Here you would call your API to add the comment
    console.log("Adding comment to post", postId, comment);

    // Mock implementation - add to the list
    const newComment = {
      id: Math.random().toString(),
      user: {
        id: "currentUser",
        name: "You",
        avatar: userPhoto,
        role: "Member",
      },
      content: comment,
      timestamp: new Date(),
      likes: 0,
    };

    onCommentAdded(newComment);
    // Close the modal (handled by DialogClose)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
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
          <DialogTitle>Add a Comment</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CommentForm
            onSubmit={handleSubmit}
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
  const { data: userInfo, isLoading } = useGetUserInfo(post?.created_by);
  const { data: roles, isLoading: isRolesLoading } = useGetRoles();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(mockComments);

  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (isLoading || isRolesLoading) {
    return (
      <div className="p-5 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded mt-5"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 border border-gray-200 bg-white dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={userPhoto.src || "/placeholder.svg"}
            alt={post?.created_by}
          />
          <AvatarFallback>{post?.created_by?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {post?.created_by}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">
            {
              roles?.results?.find((role) => role.id === userInfo?.result?.role)
                ?.role_name
            }
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-5 dark:text-gray-300">{post?.post}</p>

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
              {comments.length} Comments
            </span>
          </Button>

          <CommentModal postId={post?.id} onCommentAdded={handleAddComment} />
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
                    onSubmit={(comment) =>
                      handleAddComment({
                        id: Math.random().toString(),
                        user: {
                          id: "currentUser",
                          name: "You",
                          avatar: userPhoto,
                          role: "Member",
                        },
                        content: comment,
                        timestamp: new Date(),
                        likes: 0,
                      })
                    }
                  />
                </div>

                <div className="mt-4 space-y-1 divide-y divide-gray-100 dark:divide-gray-800">
                  {comments.map((comment) => (
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
