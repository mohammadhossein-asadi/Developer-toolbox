import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/layout/command-palette";
import Dashboard from "./Dashboard";
import ToolPage from "./ToolPage";

export default function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-bg absolute -inset-[100%] opacity-20" />
      </div>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tools/:slug" element={<ToolPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <CommandPalette />
    </>
  );
}
