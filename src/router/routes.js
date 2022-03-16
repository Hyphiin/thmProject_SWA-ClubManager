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
      },
      {
        path: "fields/field-assignment",
        name: "field-assignment",
        component: () => import("pages/field-management/field-assignment")
      },
      {
        path: "bulletin-board",
        name: "notes-overview",
        component: () => import("pages/bulletin-board/notes-overview")
      },
      {
        path: "bulletin-board/add-note",
        name: "add-note",
        component: () => import("pages/bulletin-board/add-note")
      },
      {
        path: "bulletin-board/edit-note",
        name: "edit-note",
        component: () => import("pages/bulletin-board/edit-note")
      },
      {
        path: "calender",
        name: "appointment-overview",
        component: () => import("pages/calender/appointment-overview")
      },
      {
        path: "calender/add-appointment",
        name: "add-appointment",
        component: () => import("pages/calender/add-appointment")
      },
      {
        path: "calender/edit-appointment",
        name: "edit-appointment",
        component: () => import("pages/calender/edit-appointment")
      },
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
