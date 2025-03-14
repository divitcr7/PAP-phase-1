import { Loader } from "lucide-react"

const LoadingComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
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
      </div>
    </div>
  );
};

export default LoadingComponent;