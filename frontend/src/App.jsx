import { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import useAuthStore from "./store/authStore";

const App = () => {
  const { initAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initAuth();
    setReady(true);
  }, []);

  if (!ready) return null;

  return <AppRouter />;
};

export default App;