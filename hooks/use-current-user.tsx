"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession({required: true});

  console.log("session from hook", { session });

  return session.data?.user;
};
