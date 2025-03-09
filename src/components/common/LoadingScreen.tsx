import { Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cover bg-center z-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/40"></div>
      <div className="absolute left-0 top-1/4 h-32 w-2 bg-blue-600"></div>

      <div className="relative z-10 flex flex-col items-center">
        <img
          alt="logo"
          width={200}
          src="/images/logo/logo-transparent@2x.png"
          className="mb-8 animate-pulse"
        />

        <div className="flex items-center gap-4">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Loading...
          </span>
        </div>

        <div className="mt-4 text-gray-300 text-sm">
          Finding your perfect pad
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
