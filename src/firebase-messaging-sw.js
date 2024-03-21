importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyApTkEUlCPLmxSbX0i3shEKzg_5GoZ3EQE",
  projectId: "anthelios-league-cde14",
  messagingSenderId: "118900342700",
  appId: "1:118900342700:web:11a0a76c4c336a41544409",
  storageBucket: "anthelios-league-cde14.appspot.com",
  authDomain: "anthelios-league-cde14.firebaseapp.com",
  databaseURL: "https://anthelios-test-notifications.firebaseio.com",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage();

const CACHE_NAME = "anthelios-league-v1.2.5";

const cacheUrls = ["/", "/src/assets/"];

self.addEventListener("install", (ev) => {
  console.log("installling... ", ev);

  caches
    .open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(cacheUrls);
    })
    .catch((error) => {
      console.error(error);
    });
});

self.addEventListener("activate", (ev) => {
  console.log("activating... ", ev);

  // Limpiar caches antiguos
  const limpiarCachePr = caches.keys().then((names) => {
    const limpiarViejosPr = names.map((name) => {
      if (name !== CACHE_NAME) {
        return caches.delete(name);
      }
    });
  });

  ev.waitUntil(limpiarCachePr);
});

self.addEventListener("fetch", (ev) => {
  console.log("fetching...");
  // Esto lo que hace es revisar dentro del cache si existe la url (de cacheUrl) solicitada,
  //  caso contrario la pedirá al servidor
  const responsePromise = caches
    .match(ev.request)
    .then((response) => {
      if (response) {
        return response;
      }

      return fetch(ev.request);
    })
    .catch((error) => {
      // Aqui manejamos cuando no hay internet, qué mostrar
      console.error(error);
      if (ev.request.mode === "navigate") {
        return caches.match("./src/assets/offline.html");
      }
    });

  ev.respondWith(responsePromise);
});
