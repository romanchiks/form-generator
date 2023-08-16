import Vue from "vue";
// import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

const vuetify = createVuetify({
  components,
});

Vue.use(vuetify);

const opts = {};

export default vuetify;
