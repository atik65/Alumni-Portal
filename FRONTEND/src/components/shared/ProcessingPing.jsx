const ProcessingPing = () => {
  return (
    <div className="flex gap-2 justify-center items-center ">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-800"></span>
      </span>

      <span>Processing...</span>
    </div>
  );
};

export default ProcessingPing;
