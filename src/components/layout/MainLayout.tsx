import { ReactNode, useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MatrixRain } from '../animations/MatrixRain';
import { LoadingSequence } from '../animations/LoadingSequence';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if we've already shown the loading sequence
    const loaded = sessionStorage.getItem('portfolio-loaded');
    if (loaded) {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem('portfolio-loaded', 'true');
  };

  if (isLoading && !hasLoaded) {
    return <LoadingSequence onComplete={handleLoadComplete} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <div className="scanlines pointer-events-none fixed inset-0 z-10 opacity-30" />
      <Sidebar />
      <main className="lg:ml-64 min-h-screen relative z-20">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
