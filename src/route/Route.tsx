import { lazy } from "react";

const routelist = [
  {
    path: "/register",
    component: lazy(async () => await import("../auth/Register")),
  },
  {
    path: "/login",
    component: lazy(async () => await import("../auth/Login")),
  },
  {
    path: "/",
    component: lazy(async () => await import("../mettingView/index")),
  },
  {
    path: "/meeting",
    component: lazy(async () => await import("../metting/CreateMetting")),
  },
  {
    path: "/page-not-found",
    component: lazy(async () => await import("../PageNotFound")),
  },
  {
    path: "/show",
    component: lazy(async () => await import("../home/show/index")),
  },
];

export default routelist;
