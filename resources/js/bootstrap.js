import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// Only initialize Echo if we have a valid app key
const appKey = import.meta.env.VITE_PUSHER_APP_KEY;
const cluster = import.meta.env.VITE_PUSHER_CLUSTER;

if (appKey && cluster) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: appKey,
        cluster: cluster,
        forceTLS: false,
        disabledTransports: ['sockjs']
    });
} else {
    window.Echo = null;
}