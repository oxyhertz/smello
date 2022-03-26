import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/style.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { focusDirective } from './directives/';
import Avatar from 'vue3-avatar';
import vClickOutside from "click-outside-vue3";

const app = createApp(App).component('avatar', Avatar);
app.directive('focus', focusDirective);

app.use(vClickOutside);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app');

