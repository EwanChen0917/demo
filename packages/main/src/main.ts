import { createApp } from "vue";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";
import App from "./App.vue";
import { router } from "./router";
import { BaseButton, BaseInput, SvgIcon } from "@app/shared";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.component("SvgIcon", SvgIcon);
app.mount("#app");
