import CardWrapper from "@/components/auth/card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex justify-center items-center">
        <FaExclamationTriangle className="h-12 w-12 text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
