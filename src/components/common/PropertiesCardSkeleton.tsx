import { Skeleton } from '../ui/skeleton';

function PropertiesCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white">
      {/* Image area */}
      <div className="relative w-full h-70 overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 space-y-4">
        <div>
          <Skeleton className="h-7 w-3/4 my-2" />
          <div className="flex items-start mt-6">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1.5 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1.5 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <Skeleton className="h-4 w-1/2 my-2" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3].map((j) => (
              <div key={j}>
                <Skeleton className="h-4" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  );
}

export default PropertiesCardSkeleton