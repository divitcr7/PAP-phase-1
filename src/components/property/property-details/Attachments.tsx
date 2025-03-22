import { Download } from "lucide-react";
import { Attachment } from "@/types/properties";

interface AttachmentsProps {
  attachments: Attachment[];
}

export default function Attachments({ attachments }: AttachmentsProps) {
  return (
    <div className="space-y-6 p-4">
      <h6 className="text-lg font-semibold">File Attachments</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((file, index) => (
          <div key={index} className="p-4 flex items-center gap-4">
            <div className="w-10 h-10">
              <img
                src={file.imgSrc}
                alt={file.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              {file.name}
            </a>
            <Download className="w-5 h-5 text-gray-600 ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
