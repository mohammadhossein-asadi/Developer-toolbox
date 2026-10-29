/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerSW: (options?: any) => ((reloadPage?: boolean) => Promise<void>) | undefined;
  export default registerSW;
  export type RegisterSWOptions = {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegisteredSW?: (url: string, registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: unknown) => void;
  };
}
