import { NewPasswordForm } from "@/components/auth/new-reset-form";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
