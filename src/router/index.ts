import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  RouteRecordRaw,
  Router as _Router,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import OneTeleportView from "../views/OneTeleportView.vue";
import TwoTeleportView from "../views/TwoTeleportView.vue";
import NestedTeleportView from "../views/NestedTeleportView.vue";

export type Router = _Router;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/one-teleport",
    name: "one-teleport",
    component: OneTeleportView,
  },
  {
    path: "/two-teleport",
    name: "two-teleport",
    component: TwoTeleportView,
  },
  {
    path: "/nested-teleport",
    name: "nested-teleport",
    component: NestedTeleportView,
  },
];

export function createBrowserRouter(): Router {
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
}

export function createBackendRouter(): Router {
  return createRouter({
    history: createMemoryHistory(process.env.BASE_URL),
    routes,
  });
}
