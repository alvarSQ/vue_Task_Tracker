import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routerHistory = createWebHashHistory();

import HomePage from "./pages/home";
import newTask from "./pages/newTask";
import editTask from "./pages/editTask";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/notFound";

const routers = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/new",
      name: "newTask",
      component: newTask,
      props: true
    },
    {
      path: "/edit/:id",
      name: "editTask",
      component: editTask,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/:CatchAll(.*)",
      name: "404",
      component: NotFoundPage,
    },
  ],
});

export default routers;
