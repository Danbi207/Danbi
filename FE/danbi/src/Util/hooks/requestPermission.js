import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 해당 함수만 export로 보낼 때
export const requestPermission = async () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "test-cca3f.firebaseapp.com",
    projectId: "test-cca3f",
    storageBucket: "test-cca3f.appspot.com",
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

  axios({
    url: '/http://localhost:8080/api/v1/fcm/token',
    method: 'post',
    data: {
      FCM_token: token	
    }
  })
  .then((res) => { 
    console.log(res) 
    console.log('FCM 토근을 가져왔습니다.') 
  })
  .catch((err) => {
    console.log(err);
    console.log('FCM 토큰을 가져올 수 없습니다.');
  });

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
  });
}



