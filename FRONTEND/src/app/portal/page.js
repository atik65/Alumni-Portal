"use client";
import React, { useState } from "react";

const Page = () => {
  // Dummy Data for Posts
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
    // Add more dummy posts if needed
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  // Dummy Data for Events
  const allEvents = [
    { id: 1, title: "Hackathon 2024", description: "Join us for an exciting coding challenge!", time: "March 10th, 10:00 AM" },
    { id: 2, title: "Annual Tech Meetup", description: "Network with tech enthusiasts and professionals.", time: "April 25th, 5:00 PM" },
    { id: 3, title: "Design Thinking Workshop", description: "Explore innovative design solutions.", time: "May 15th, 2:00 PM" },
    { id: 4, title: "Startup Pitch Night", description: "Showcase your ideas to investors.", time: "June 5th, 6:00 PM" },
    { id: 5, title: "Web3 Summit", description: "Deep dive into blockchain and Web3 technologies.", time: "July 20th, 9:00 AM" },
  ];
  const [displayedEvents, setDisplayedEvents] = useState(allEvents.slice(0, 3)); // Display only the first 3 events initially

  const loadMoreEvents = () => {
    setDisplayedEvents(allEvents.slice(0, displayedEvents.length + 3)); // Load 3 more events
  };

  const loadLessEvents = () => {
    setDisplayedEvents(allEvents.slice(0, 3)); // Reset to first 3
  };

  // Add a new post
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

  // Handle Likes
  const likePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Add Comment
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
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-3 gap-4">
        {/* Posts Section: Takes Two-Thirds */}
        <div className="col-span-2 space-y-4">
          {/* New Post Form */}
          <div className="p-3 border border-gray-200 bg-white rounded-lg shadow-md">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            ></textarea>
            <button
              onClick={addPost}
              className="mt-2 text-sm font-semibold hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] hover:dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white duration-200"
            >
              Post
            </button>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="p-3 border border-gray-200 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-gray-700">{post.author}</h3>
              <p className="mt-1 text-gray-600">{post.content}</p>

              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  <span>👍</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <span>🔄</span>
                  <span>{post.shares}</span>
                </button>
              </div>

              {/* Comments */}
              <div className="mt-3">
                <h4 className="font-bold text-gray-700">Comments</h4>
                {post.comments.map((comment) => (
                  <p key={comment.id} className="mt-1 text-gray-600">
                    <span className="font-bold">{comment.author}:</span> {comment.text}
                  </p>
                ))}

                {/* Add Comment */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim() !== "") {
                        addComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div
                    className="cursor-pointer text-white rounded-full h-10 w-10 flex items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] duration-200"
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Write a comment..."]`);
                      if (input && input.value.trim() !== "") {
                        addComment(post.id, input.value);
                        input.value = "";
                      }
                    }}
                  >
                    {/* Replace this with any Send Icon from a library like Heroicons, Material Icons, etc. */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Events Section: Takes One-Third */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Events</h2>

            {/* Render the events */}
            {displayedEvents.map((event) => (
              <div key={event.id} className="border-b pb-3 mb-3">
                <h3 className="text-gray-800 font-semibold">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
                <p className="text-gray-500 text-sm mt-1">{event.time}</p>
              </div>
            ))}

            {/* Load More and Load Less Buttons */}
            <div className="mt-3 flex space-x-2">
              {displayedEvents.length < allEvents.length && (
                <button
                  onClick={loadMoreEvents}
                  className="text-sm font-semibold hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] hover:dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white duration-200"
                >
                  Load More
                </button>
              )}

              {displayedEvents.length > 3 && (
                <button
                  onClick={loadLessEvents}
                  className="text-sm font-semibold hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] hover:dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white duration-200"
                >
                  Load Less
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
