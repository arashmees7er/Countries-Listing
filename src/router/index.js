import VueRouter from "vue-router";
import Listing from "@/components/Listing";
import ViewCountry from "@/components/ViewCountry";
// import NotFound from "./components/404.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Listing
  },
  {
    name: "viewCountry",
    path: "/view",
    component: ViewCountry
  }
  // { name: "*", path: "*", component: NotFound }
];

const router = new VueRouter({
  history: true,
  mode: "history",
  routes
});

export default router;

// import Vue from "vue";
// import Router from "vue-router";
// import Listing from "@/components/Listing";

// Vue.use(Router);

// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "Listing",
//       component: Listing
//     }
//   ]
// });
