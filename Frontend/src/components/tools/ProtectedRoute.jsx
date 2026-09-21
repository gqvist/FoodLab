import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../lib/auth/getCurrentUser.js";

export default function ProtectedRoute({ children }) {
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
    return <p>Kontrollerar inloggning...</p>;
  }

  if (status === "error") {
    return <p role="alert">Kunde inte ansluta. Ladda om sidan för att försöka igen.</p>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
