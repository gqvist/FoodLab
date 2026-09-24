import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCurrentUser } from "../../lib/auth/getCurrentUser.js";
import { Spinner } from "../ui/spinner.jsx";
import sadFaceError from "../../assets/logos/SadFaceError.svg";
import TopNav from "../top-nav/TopNav.jsx";

export default function ProtectedRoute() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const user = await getCurrentUser();

        if (active) {
          setStatus(user ? "authenticated" : "unauthenticated");
        }
      } catch {
        if (active) {
          setStatus("error");
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <>
        <TopNav />
        <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3">
          <Spinner className="size-6" />
          <p>Kontrollerar inloggning...</p>
        </main>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <TopNav />
        <main
          className="flex min-h-screen flex-col items-center justify-center gap-3 text-center"
          role="alert"
        >
          <img src={sadFaceError} alt="" className="size-16" />
          <p>Kunde inte ansluta till servern...</p>
        </main>
      </>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
