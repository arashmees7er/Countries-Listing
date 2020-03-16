// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import _ from "lodash";
import App from "./App";
import axios from "axios";
import router from "./router";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import "./mixin";
import "./assets/index.scss";

const PLUGINS = [
  {
    name: Element,
    options: { size: "medium", locale }
  },
  {
    name: VueRouter,
    options: {}
  },
  {
    name: VueAxios,
    options: axios
  }
];

window.Vue = Vue;
Vue.router = router;

PLUGINS.forEach(component => {
  Vue.use(component.name, component.options);
});

Vue.config.productionTip = false;
Vue.prototype._ = _;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
