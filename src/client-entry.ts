import { createSSRApp } from "vue";
import { createBrowserRouter } from "@/router";
import Root from "./App.vue";

// XXX: Keep entries consistent: entry-client.ts, entry-server.ts

async function initApp(): Promise<void> {
  const app = createSSRApp(Root);
  const router = createBrowserRouter();
  app.use(router);

  // For console debugging
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).app = app;

  await router.isReady();
  app.mount("#app");
}

initApp();
