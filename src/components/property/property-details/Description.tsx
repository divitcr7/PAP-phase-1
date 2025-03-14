interface DescriptionProps {
  city: string;
}

export default function Description({ city }: DescriptionProps) {
  return (
    <div className="p-4 space-y-4">
      <h5 className="font-semibold text-3xl">Description</h5>
      <p className="">
        Located around an hour away from {city}, between the Perche and the Iton
        valley, in a beautiful wooded park bordered by a charming stream, this
        country property immediately seduces with its bucolic and soothing
        environment.
      </p>
      <p className="">
        An ideal choice for sports and leisure enthusiasts who will be able to
        take advantage of its swimming pool (11m x 5m), tennis court, gym, and
        sauna.
      </p>
      <a href="#" className="">
        <span className="text-blue-600 underline">View More</span>
      </a>
    </div>
  );
}
