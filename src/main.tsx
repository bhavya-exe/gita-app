
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import App from './App.tsx'
import { LoadingScreen } from './components/layout/LoadingScreen.tsx'
import './index.css'

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Ensure loading screen shows for at least 1.5 seconds
  useEffect(() => {
    const minLoadTime = setTimeout(() => {
      // This ensures we don't set isLoading to false before the progress reaches 100%
    }, 1500);

    return () => clearTimeout(minLoadTime);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      ) : (
        <App />
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
