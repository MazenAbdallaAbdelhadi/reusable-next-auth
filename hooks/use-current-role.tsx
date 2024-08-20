"use client";
import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession({ required: true });

  return session.data?.user?.role;
};
