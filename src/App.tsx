import { useEffect } from "react";
import AppRouter from "./app/routing/AppRouter";
import { useAuth } from "./store/useAuth";

function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    // initializeAuth returns a cleanup function that unsubscribes from auth changes
    // Storing and calling it on unmount prevents the memory leak from accumulating listeners
    let cleanup: (() => void) | undefined;

    initializeAuth().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array intentional — Zustand actions are stable, no need to re-run

  return <AppRouter />;
}

export default App;
