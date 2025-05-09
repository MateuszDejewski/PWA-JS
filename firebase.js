// Importujemy niezbędne funkcje z Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-messaging.js";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWTYZnfoPq2eImwcDmSoqq7izFN6e50ps",
  authDomain: "pwajs-91d0f.firebaseapp.com",
  projectId: "pwajs-91d0f",
  storageBucket: "pwajs-91d0f.firebasestorage.app",
  messagingSenderId: "641751115148",
  appId: "1:641751115148:web:25f5424fe180565b11e2a9",
  measurementId: "G-N4Y02JV9QB"
};

// Inicjalizacja aplikacji Firebase
const app = initializeApp(firebaseConfig);

// Uzyskanie instancji Messaging
const messaging = getMessaging(app);

// Funkcja do uzyskania tokenu i zapisania go na backend
export const getNotificationToken = async () => {
  try {
    // Zgoda na powiadomienia
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Brak zgody na powiadomienia");
    }

    // Uzyskanie tokenu do subskrypcji
    const token = await getToken(messaging, {
      vapidKey: "BHUiyJXyYEq_6W0bQ5-5CH-MIPdqitX5K-JvjbxqIvgOv7s4wTN0yHdOIAVzjjjbkdaj4TiuVepCreufdl-hOOI",  // Twój klucz publiczny VAPID
    });

    if (token) {
      console.log("Token FCM:", token);
      // Możesz teraz wysłać token na backend
      return token;
    } else {
      console.error("Nie udało się uzyskać tokenu FCM.");
    }
  } catch (error) {
    console.error("Błąd podczas uzyskiwania tokenu:", error);
  }
};

// Funkcja do obsługi wiadomości w tle (powiadomienia przychodzące)
export const handleForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Otrzymano wiadomość:", payload);
    // Możesz obsługiwać powiadomienia np. wyświetlając je
  });
};
