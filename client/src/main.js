// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import io from 'socket.io-client';

const app = createApp(App);

// Create and configure the socket instance
const socket = io('http://localhost:3000'); // Replace with your server URL

// Set up socket connection and listeners
socket.on('autobotCountUpdate', (count) => {
    store.dispatch('updateAutobotCount', count);
});

// Add socket to the app instance if needed (for accessing in other components)
app.config.globalProperties.$socket = socket;

app.use(store).mount('#app');
