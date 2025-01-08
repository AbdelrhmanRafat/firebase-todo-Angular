import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';


const firebaseConfig = {
  apiKey: "AIzaSyAcFySvgVUJt_fWJgZPY087l3UYrLAJAP0",
  authDomain: "todo-app-61566.firebaseapp.com",
  projectId: "todo-app-61566",
  storageBucket: "todo-app-61566.firebasestorage.app",
  messagingSenderId: "11595307742",
  appId: "1:11595307742:web:5012f9a8b91b67ef51c04f",
  measurementId: "G-NE1TS426WG"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),  // Provide the Auth service here
    provideFirestore(() => getFirestore())
  ]
};
