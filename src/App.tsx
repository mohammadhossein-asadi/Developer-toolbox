import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/layout/command-palette";
import Dashboard from "./Dashboard";
import ToolPage from "./ToolPage";
import { useState, useEffect, Component, type ReactNode } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center glass rounded-2xl p-8 max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-2">Page not found</p>
        <p className="text-muted-foreground text-sm mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm">
          Go Home
        </a>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center glass rounded-2xl p-8 max-w-md">
            <h1 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h1>
            <p className="text-muted-foreground text-sm mb-4">{this.state.error?.message || "An unexpected error occurred."}</p>
            <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }} className="inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm">
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-primary focus:text-primary-foreground focus:rounded-br-lg focus:font-medium focus:text-sm">
        Skip to main content
      </a>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-bg absolute -inset-[100%] opacity-20" />
      </div>
      <div className="flex min-h-screen">
        <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header onMenuToggle={() => setMobileMenuOpen(true)} />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tools/:slug" element={<ToolPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
        </div>
      </div>
      <CommandPalette />
    </>
  );
}