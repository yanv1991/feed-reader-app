if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    const matchCb = ({ url, event }) => {
      return url.pathname.includes("feeds");
    };

    workbox.routing.registerRoute(
      matchCb,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "api-cache",
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
          })
        ]
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
