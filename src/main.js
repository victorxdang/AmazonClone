import { createApp } from 'vue';
import Toast from 'vue-toastification';

import router from './router';
import App from './App.vue';

import './styles/shared/general.css';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(Toast);
app.mount('#app');