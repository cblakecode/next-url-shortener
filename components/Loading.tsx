const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
