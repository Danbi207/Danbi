import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { authPost } from "../apis/api";

// 해당 함수만 export로 보낼 때
export const requestPermission = async () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "danbi-1fa19.firebaseapp.com",
    projectId: "danbi-1fa19",
    storageBucket: "danbi-1fa19.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  const Token = { "fcm_token" : token }

  const res =  await authPost('/api/v1/fcm/token', Token)
    if (res) {
      console.log('FCM 토큰을 가져왔습니다.')
    }
    else {
      console.log('FCM 토큰을 가져올 수 없습니다.')
      console.log(Token);
    }

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
  });
}



