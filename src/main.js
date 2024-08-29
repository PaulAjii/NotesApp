import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { vAutoResize } from './utils';

const app = createApp(App);
app.directive('auto-resize', vAutoResize);
app.mount('#app');
