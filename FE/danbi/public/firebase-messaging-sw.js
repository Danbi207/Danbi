self.addEventListener("push", function (event) {
  console.log("push: ", event.data.json());
  if (!event.data.json()) return;

  const resultData = event.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: "favicon.ico",
    tag: resultData.tag,
    ...resultData,
  };
  // console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  // const url = "/";
  // event.waitUntil(clients.openWindow(url));
});
