// The old games remain playable until the independent site is available.
(() => {
  const target = document.currentScript?.dataset.aigamesTarget;
  if (!target || !/^\/AIGames\/[a-z0-9_.-]*$/i.test(target)) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  fetch('/AIGames/migration-ready.json', { cache: 'no-store', signal: controller.signal })
    .then(response => response.ok ? response.json() : null)
    .then(marker => {
      if (marker?.site === 'AIGames' && marker.schema === 1) {
        location.replace(target + location.search + location.hash);
      }
    })
    .catch(() => { /* Unpublished/unreachable destination: keep the working old page. */ })
    .finally(() => clearTimeout(timeout));
})();
