"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession({ required: true });

  return session.data?.user;
};
