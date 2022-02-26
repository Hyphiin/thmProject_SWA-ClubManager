const routes = [
  {
    path: "",
    name: "login",
    component: () => import("pages/Login.vue")
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "PageIndex",
        component: () => import("pages/Index.vue")
      },
      {
        path: "fields",
        name: "fields-overview",
        component: () => import("pages/field-management/fields-overview")
      },
      {
        path: "fields/edit-field",
        name: "edit-field",
        component: () => import("pages/field-management/edit-field")
      },
      {
        path: "fields/add-field",
        name: "add-field",
        component: () => import("pages/field-management/add-field")
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
