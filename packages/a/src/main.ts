import { createApp } from "vue";
import AView from "./AView.vue";
import { BaseButton, BaseInput } from "@app/shared";

const app = createApp(AView);
app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.mount("#app");
