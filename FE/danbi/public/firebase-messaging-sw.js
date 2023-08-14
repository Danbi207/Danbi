self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("push", function (event) {
  console.log("push: ", event.data.json());
  if (!event.data.json()) return;

  const resultData = event.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  alert("notification 클릭해");
  event.waitUntil(
    self.clients.openWindow('https://i9d207.p.ssafy.io'));
});
