import { useState } from 'react';
import { GoldProvider } from './context/GoldContext';
import { ThemeProvider } from './context/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { AlertsProvider } from './context/AlertsContext';
import { LiveTicker } from './components/global/LiveTicker';
import { BottomNav } from './components/global/BottomNav';
import { HomePage } from './pages/HomePage';
import { MarketsPage } from './pages/MarketsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { SafePage } from './pages/SafePage';
import { CeyrekPage } from './pages/CeyrekPage';
import './index.css';

type PageType = 'home' | 'markets' | 'calculator' | 'safe' | 'ceyrek';

function App() {
  const [activePage, setActivePage] = useState<PageType>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'markets':
        return <MarketsPage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'safe':
        return <SafePage />;
      case 'ceyrek':
        return <CeyrekPage onBack={() => setActivePage('home')} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <GoldProvider>
        <WatchlistProvider>
          <AlertsProvider>
            <div className="app-container">
              <LiveTicker />

              <main className="main-content container">
                {renderPage()}
              </main>

              <BottomNav
                activePage={activePage}
                onNavigate={(page) => setActivePage(page as PageType)}
              />
            </div>
          </AlertsProvider>
        </WatchlistProvider>
      </GoldProvider>
    </ThemeProvider>
  );
}

export default App;

