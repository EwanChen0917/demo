import { createApp } from "vue";
import BView from "./BView.vue";
import { BaseButton, BaseInput } from "@app/shared";

const app = createApp(BView);
app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.mount("#app");
