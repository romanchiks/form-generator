import pages from "./pages";

const children = pages.map((page) => ({
  path: page.path,
  component: () => import("../pages/" + page.file + ".vue"),
}));

const routes = [
  {
    path: "/",
    component: () => import("../layouts/main-layout/main-layout.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/form-example/form-example.vue"),
      },
    ].concat(children),
  },
];

export default routes;
