"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Excited to announce my new blog post on React best practices!",
      likes: 24,
      comments: [{ id: 1, text: "Great post! Can't wait to read it.", author: "Jane" }],
      shares: 3,
    },
    {
      id: 2,
      author: "Emily Clark",
      content: "How to design a scalable backend system? Sharing some tips.",
      likes: 75,
      comments: [],
      shares: 10,
    },
    {
      id: 3,
      author: "Sarah Lee",
      content: "Anyone knows a good tutorial for advanced React hooks?",
      likes: 15,
      comments: [],
      shares: 1,
    },
  ]);
  const [newPostContent, setNewPostContent] = useState("");

  const allEvents = [
    { id: 1, title: "Hackathon 2024", description: "Join us for an exciting coding challenge!", time: "March 10th, 10:00 AM" },
    { id: 2, title: "Annual Tech Meetup", description: "Network with tech enthusiasts and professionals.", time: "April 25th, 5:00 PM" },
    { id: 3, title: "Design Thinking Workshop", description: "Explore innovative design solutions.", time: "May 15th, 2:00 PM" },
    { id: 4, title: "Startup Pitch Night", description: "Showcase your ideas to investors.", time: "June 5th, 6:00 PM" },
    { id: 5, title: "Web3 Summit", description: "Deep dive into blockchain and Web3 technologies.", time: "July 20th, 9:00 AM" },
  ];
  const [displayedEvents, setDisplayedEvents] = useState(allEvents.slice(0, 3));

  const loadMoreEvents = () => {
    setDisplayedEvents(allEvents.slice(0, displayedEvents.length + 3));
  };

  const loadLessEvents = () => {
    setDisplayedEvents(allEvents.slice(0, 3));
  };

  const addPost = () => {
    if (newPostContent.trim() === "") return;
    const newPost = {
      id: posts.length + 1,
      author: "You",
      content: newPostContent,
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const likePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  const addComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { id: Date.now(), text: comment, author: "You" }] }
          : post
      )
    );
  };

  return (
    <div className="container mx-auto xl:space-y-0 grid grid-cols-12 gap-5">
      {/* Left Side: Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 xl:col-span-8 bg-[--core-bg] dark:bg-[--core-bg-dark] p-5 rounded-lg"
      >
        <div className="mb-5">
          {/* New Post Form */}
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 dark:bg-[--core-bg-dark] dark:text-white"
          ></textarea>
          <button
            onClick={addPost}
            className="mt-2 w-full bg-[--secondary-bg] dark:bg-[--secondary-bg-dark] text-white h-10 rounded-lg"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 mb-4 border border-gray-200 bg-[--core-bg] dark:bg-[--core-bg-dark] rounded-lg shadow-md"
          >
            <h3 className="font-semibold text-gray-700 dark:text-white">{post.author}</h3>
            <p className="text-gray-600 dark:text-gray-300">{post.content}</p>

            <div className="mt-3 flex space-x-4">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-2 text-blue-500 dark:text-blue-300"
              >
                👍 <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-500 dark:text-blue-300">
                🔄 <span>{post.shares}</span>
              </button>
            </div>

            <div className="mt-4">
              {post.comments.map((comment) => (
                <p key={comment.id} className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">{comment.author}:</span> {comment.text}
                </p>
              ))}
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:bg-[--core-bg-dark] dark:text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    addComment(post.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Right Side: Events Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="col-span-12 xl:col-span-4 bg-[--core-bg] dark:bg-[--core-bg-dark] p-5 rounded-lg"
      >
        <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Upcoming Events</h2>
        <div>
          {displayedEvents.map((event) => (
            <div key={event.id} className="p-4 mb-4 border border-gray-200 bg-[--core-bg] dark:bg-[--core-bg-dark] rounded-lg">
              <h3 className="font-semibold text-gray-700 dark:text-white">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={loadMoreEvents}
            className="text-blue-500 dark:text-blue-300"
          >
            Load More
          </button>
          <button
            onClick={loadLessEvents}
            className="text-blue-500 dark:text-blue-300"
          >
            Load Less
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
