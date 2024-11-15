const LoadingSkeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse">
      <div
        className={`h-10 opacity-20 bg-gray-500 dark:bg-gray-600 rounded-lg  w-full mb-4`}
      ></div>
    </div>
  );
};

export default LoadingSkeleton;
