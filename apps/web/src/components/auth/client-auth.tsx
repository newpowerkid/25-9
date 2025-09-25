"use client";

import { useSession } from "~/lib/auth-client";

interface LoggedInProps {
  children: React.ReactNode;
}

interface LoggedOutProps {
  children: React.ReactNode;
}

export const ClientLoggedIn = ({ children }: LoggedInProps) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export const ClientLoggedOut = ({ children }: LoggedOutProps) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return null;
  }

  if (session) {
    return null;
  }

  return <>{children}</>;
};
