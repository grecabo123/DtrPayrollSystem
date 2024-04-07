import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '8ceb2ce29720e1df9116',
    cluster: 'ap1',
    encrypted: true,
});
