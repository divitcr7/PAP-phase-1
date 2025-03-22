import React, { useState } from "react";
import { PlayCircle } from "lucide-react";

interface VideoProps {
  videoURI: string;
}

const Video: React.FC<VideoProps> = ({ videoURI }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4">
      <h5 className="text-xl font-semibold mb-4">Video</h5>
      <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
        {isPlaying ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoURI}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        ) : (
          <div className="relative">
            <img
              src="/images/banner/img-video.jpg"
              alt="Video Thumbnail"
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={() => setIsPlaying(true)}
            />
            <button
              type="button"
              title="Play Video"
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition duration-300"
              onClick={() => setIsPlaying(true)}
            >
              <PlayCircle className="w-16 h-16 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
