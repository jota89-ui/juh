const CACHE_NAME = "joelma-pocahontas-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./images/gym-background.jpg",
  "./images/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
  "./images/Barbell_Bench_Press_-_Medium_Grip/1.jpg",
  "./images/Incline_Dumbbell_Press/0.jpg",
  "./images/Incline_Dumbbell_Press/1.jpg",
  "./images/Butterfly/0.jpg",
  "./images/Butterfly/1.jpg",
  "./images/Triceps_Pushdown/0.jpg",
  "./images/Triceps_Pushdown/1.jpg",
  "./images/Standing_Dumbbell_Triceps_Extension/0.jpg",
  "./images/Standing_Dumbbell_Triceps_Extension/1.jpg",
  "./images/Wide-Grip_Lat_Pulldown/0.jpg",
  "./images/Wide-Grip_Lat_Pulldown/1.jpg",
  "./images/Seated_Cable_Rows/0.jpg",
  "./images/Seated_Cable_Rows/1.jpg",
  "./images/One-Arm_Dumbbell_Row/0.jpg",
  "./images/One-Arm_Dumbbell_Row/1.jpg",
  "./images/Barbell_Curl/0.jpg",
  "./images/Barbell_Curl/1.jpg",
  "./images/Hammer_Curls/0.jpg",
  "./images/Hammer_Curls/1.jpg",
  "./images/Barbell_Full_Squat/0.jpg",
  "./images/Barbell_Full_Squat/1.jpg",
  "./images/Leg_Press/0.jpg",
  "./images/Leg_Press/1.jpg",
  "./images/Lying_Leg_Curls/0.jpg",
  "./images/Lying_Leg_Curls/1.jpg",
  "./images/Dumbbell_Shoulder_Press/0.jpg",
  "./images/Dumbbell_Shoulder_Press/1.jpg",
  "./images/Side_Lateral_Raise/0.jpg",
  "./images/Side_Lateral_Raise/1.jpg",
  "./images/Goblet_Squat/0.jpg",
  "./images/Goblet_Squat/1.jpg",
  "./images/Stiff-Legged_Dumbbell_Deadlift/0.jpg",
  "./images/Stiff-Legged_Dumbbell_Deadlift/1.jpg",
  "./images/Dumbbell_Floor_Press/0.jpg",
  "./images/Dumbbell_Floor_Press/1.jpg",
  "./images/Dumbbell_Bicep_Curl/0.jpg",
  "./images/Dumbbell_Bicep_Curl/1.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith("joelma-pocahontas-") && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }))
  );
});
