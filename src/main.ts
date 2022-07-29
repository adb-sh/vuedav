import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap-icons/font/bootstrap-icons.scss';
import './main.scss';
import { ThemeConfig, writeDarkSwitch } from 'bootstrap-darkmode';

export const themeConfig = new ThemeConfig();
themeConfig.initTheme();

createApp(App).use(store).use(router).mount('#app');
