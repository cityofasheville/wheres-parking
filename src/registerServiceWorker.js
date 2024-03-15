const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

async function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        console.log('Running in localhost, service worker checked');
      } else {
        try {
          const registration = await navigator.serviceWorker.register(swUrl);
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log('New content is available; please refresh.');
                  // Optionally, prompt user to refresh or automatically refresh the page
                  // window.location.reload();
                } else {
                  // Precached content available
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        } catch (error) {
          console.error('Error during service worker registration:', error);
        }
      }
    });
  }
}

async function checkValidServiceWorker(swUrl) {
  try {
    const response = await fetch(swUrl);
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      // Valid service worker found
      await registerValidSW(swUrl);
    }
  } catch {
    console.log('No internet connection found. App is running in offline mode.');
  }
}

export { register };

export async function unregister() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.unregister();
  }
}