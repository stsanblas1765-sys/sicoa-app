// ============================================================
// firebase-messaging-sw.js
// Este archivo DEBE estar en la raíz del sitio (junto a index.html),
// con ese nombre exacto. Es lo que permite que las notificaciones push
// lleguen aunque el navegador esté cerrado o la pantalla bloqueada —
// el sistema operativo del teléfono lo ejecuta por su cuenta cuando
// llega una notificación, sin necesidad de que la pestaña esté abierta.
// ============================================================

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// IMPORTANTE: estos valores deben ser EXACTAMENTE los mismos que pusiste
// en FIREBASE_CONFIG dentro de index.html.
firebase.initializeApp({
  apiKey: "AIzaSyDUmS8zjc_cAxNEVRVQC8zgikc6hClvB4E",
  authDomain: "sicoa-7885a.firebaseapp.com",
  projectId: "sicoa-7885a",
  storageBucket: "sicoa-7885a.firebasestorage.app",
  messagingSenderId: "522229884003",
  appId: "1:522229884003:web:3aa0c61a0d0a9647464456"
});

const messaging = firebase.messaging();

// Se dispara cuando llega una notificación y la app está cerrada o en
// segundo plano (que es exactamente el caso que nos interesa cubrir).
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || 'SICOA';
  const opciones = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png',
    requireInteraction: true,
    tag: 'sicoa-push-checkin'
  };
  self.registration.showNotification(titulo, opciones);
});

// Al tocar la notificación, enfoca la app si ya está abierta, o la abre
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
