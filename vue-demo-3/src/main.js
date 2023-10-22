/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import MksUi from "mks-ui";



const app = createApp(App); 
app.component("Button", MksUi.Button);

app.mount('#app');
