self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  // role에 따라 url 수정
  let role = localStorage.getItem('role'); 
  let url;
  if (role === 'ip') {
    url = '/help/ip';
  } else if (role === 'helper') {
    url = '/help/helper';
  } else {
    url = '/'; // 만약 role 값이 위의 두 경우가 아닐 경우, 기본 URL로 이동
  }
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
