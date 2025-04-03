import { ApplicantType } from "@/schemas/ApplyForm/ApplyForm";

interface ApplicantDisplayProps {
  applicantType: ApplicantType;
  applicantIndex: number;
  name?: string;
  className?: string;
}

export function ApplicantDisplay({
  applicantType,
  applicantIndex,
  name,
  className = "",
}: ApplicantDisplayProps) {
  let title = "";

  if (applicantType === "applicant") {
    if (applicantIndex === 0) {
      title = "Primary Applicant";
    } else {
      title = `Co-Applicant ${applicantIndex}`;
    }
  } else {
    title = `Occupant ${applicantIndex + 1}`;
  }

  return (
    <h3 className={`text-lg ${className}`}>
      <span className="font-semibold">{title}</span>
      {name && name.trim() !== "" && (
        <span className="font-normal ml-2">- {name}</span>
      )}
    </h3>
  );
}
