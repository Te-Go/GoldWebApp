
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrganizationSchema } from './components/seo/OrganizationSchema';
import { FAQSchema } from './components/seo/FAQSchema';
import { DynamicTitle } from './components/seo/DynamicTitle';
import { StaleDataBanner } from './components/global/StaleDataBanner';
import './index.css';

// Wrapper for routing logic to use hooks
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map path to active tab ID for BottomNav
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/markets')) return 'markets';
    if (path.startsWith('/calculator')) return 'calculator';
    if (path.startsWith('/safe')) return 'safe';
    return ''; // No active tab for detail pages
  };

  const handleNavigate = (pageId: string) => {
    switch (pageId) {
      case 'home': navigate('/'); break;
      case 'markets': navigate('/markets'); break;
      case 'calculator': navigate('/calculator'); break;
      case 'safe': navigate('/safe'); break;
      default: navigate('/');
    }
  };

  return (
    <div className="app-container">
      <OrganizationSchema />
      <FAQSchema />
      <DynamicTitle />
      <StaleDataBanner />
      <LiveTicker />

      <main className="main-content container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/safe" element={<SafePage />} />
          <Route path="/altin/:goldType" element={<ProductDetailPage />} />
          <Route path="/metal/:goldType" element={<ProductDetailPage />} />
        </Routes>
      </main>

      <BottomNav
        activePage={getActivePage()}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GoldProvider>
          <WatchlistProvider>
            <AlertsProvider>
              <AppContent />
            </AlertsProvider>
          </WatchlistProvider>
        </GoldProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
