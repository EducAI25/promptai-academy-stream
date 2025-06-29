
const CACHE_NAME = 'promptai-academy-v1.0.0';
const urlsToCache = [
  '/',
  '/cursos',
  '/docentes',
  '/assinar',
  '/contato',
  '/painel',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da PromptAI Academy!',
    icon: '/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png',
    badge: '/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Cursos',
        icon: '/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PromptAI Academy', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/cursos')
    );
  } else if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
