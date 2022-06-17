import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./index.scss";
import { createApp } from "vue";
import { router } from "./routers";
import App from "./App.vue";
import PrimeVue from "primevue/config";

createApp(App)
    .use(router)
    .use(PrimeVue)
    .mount('#app')
