import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "!text-current", // Use current text color to match the toast type
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "!bg-red-100 !text-red-800 !border !border-red-400",
          success: "!bg-green-100 !text-green-800 !border !border-green-400",
          warning: "!bg-yellow-100 !text-yellow-800 !border !border-yellow-400",
          info: "!bg-blue-100 !text-blue-800 !border !border-blue-400",
        },
      }}
      icons={{
        success: <CheckCircle className="h-4 w-4 text-green-800" />,
        info: <Info className="h-4 w-4 text-blue-800" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-800" />,
        error: <XCircle className="h-4 w-4 text-red-800" />,
        loading: <Loader className="h-4 w-4 text-gray-800 animate-spin" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
