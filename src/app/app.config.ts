import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; // Import provideAuth and getAuth
import { NgxFontAwesomeComponent } from 'ngx-font-awesome/lib/ngx-font-awesome.component';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), provideAnimationsAsync(), // Provide the Auth service here
  ]
};
