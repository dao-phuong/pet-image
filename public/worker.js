var CACHE_NAME = 'pet-list-pwa4';
var urlsToCache = [
  '/index.html',
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.url.includes('/dog.ceo')) {
  	console.log('[ServiceWorker] Fetch (data)', evt.request.url);
  	evt.respondWith(
  		caches.open(DATA_CACHE_NAME).then(cache => {
  			return fetch(evt.request)
  				.then(response => {
  					// If the response was good, clone it and store it in the cache
  					if (response.status === 200) {
  						cache.put(evt.request.url, response.clone());
  					}
  					return response;
  				})
  				.catch(err => {
  					// Network request failed, try to get it from cache
  					return cache.match(evt.request);
  				})
		}));
  	return;
  }

  evt.respondWith(
  	caches.open(CACHE_NAME).then(cache => {
  		return cache.match(evt.request)
  			.then(response => {
  				return response || fetch(evt.request);
  			})
  	})
  );
});


// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});