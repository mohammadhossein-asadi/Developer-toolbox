import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
import toast from "react-hot-toast";
import { WifiOff, Download, RefreshCw } from "lucide-react";
import { createElement } from "react";

let swUpdate: ((reloadPage?: boolean) => Promise<void>) | null = null;
let registered = false;

export function setupPwa() {
  if (registered || typeof window === "undefined") return;
  registered = true;

  swUpdate = registerSW({
    immediate: true,
    onNeedRefresh() {
      const t = toast(
        (toastInstance) =>
          createElement(
            "div",
            { className: "flex items-center gap-3" },
            createElement("span", { className: "text-sm" }, "New version available!"),
            createElement(
              "button",
              {
                onClick: () => {
                  toast.dismiss(t);
                  swUpdate?.(true);
                },
                className: "h-7 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium cursor-pointer",
              },
              "Reload"
            )
          ),
        { duration: Infinity, icon: createElement(RefreshCw, { className: "h-4 w-4" }) }
      );
    },
    onOfflineReady() {
      toast.success("App ready to work offline", { icon: createElement(WifiOff, { className: "h-4 w-4" }) });
    },
  });

  // Offline / online indicator
  window.addEventListener("offline", () => {
    toast.error("You are offline — tools still work, everything is client-side", { icon: createElement(WifiOff, { className: "h-5 w-5" }), duration: 4000 });
  });
  window.addEventListener("online", () => {
    toast.success("Back online");
  });

  // Install prompt capture
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    (window as unknown as { __pwaInstallPrompt: unknown }).__pwaInstallPrompt = e;
  });
}

/** Returns whether the app can be installed and a function to trigger install. */
export function usePwaInstall(): [boolean, () => void] {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const check = () => {
      setCanInstall(Boolean((window as unknown as { __pwaInstallPrompt?: unknown }).__pwaInstallPrompt));
    };
    check();
    window.addEventListener("beforeinstallprompt", check);
    return () => window.removeEventListener("beforeinstallprompt", check);
  }, []);

  const install = () => {
    const ev = (window as unknown as { __pwaInstallPrompt?: Promise<Response> & { prompt: () => Promise<void> } }).__pwaInstallPrompt;
    if (ev) {
      ev.prompt();
      (window as unknown as { __pwaInstallPrompt?: unknown }).__pwaInstallPrompt = undefined;
      setCanInstall(false);
    }
  };

  return [canInstall, install];
}
