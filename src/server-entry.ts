import { createSSRApp, App } from "vue";
import { createBackendRouter, Router } from "@/router";
import Root from "./App.vue";

// XXX: Keep entries consistent: entry-client.ts, entry-server.ts

interface ServerContext {
  app: App;
  router: Router;
}

export default async function (): Promise<ServerContext> {
  const app = createSSRApp(Root);
  const router = createBackendRouter();
  app.use(router);

  return {
    app,
    router,
  };
}
