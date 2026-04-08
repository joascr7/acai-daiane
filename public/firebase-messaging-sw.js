importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.appspot.com",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
});

const messaging = firebase.messaging();


// 🔔 RECEBER NOTIFICAÇÃO EM BACKGROUND
messaging.onBackgroundMessage(function (payload) {
  console.log("🔔 Mensagem recebida:", payload);

  const notificationTitle = payload.notification?.title || "Novo aviso";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});