import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import FileUpload from "primevue/fileupload";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/lara-dark-blue/theme.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component("Button", Button);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("FileUpload", FileUpload);
app.use(ToastService);

app.use(router).mount("#app");
