const LoadingBubble = () => {
  return (
    <div className="flex items-center gap-3 bg-black text-white px-4 py-3 rounded-2xl w-fit shadow-md">
      {/* Spinner */}
      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

      {/* 메시지 텍스트 */}
      <p className="text-sm font-medium">답변 생성 중..</p>
    </div>
  );
};

export default LoadingBubble;
