import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, updateProfile, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseWrapperService } from '../wrapper/firebase-wrapper.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fireBaseAuth = inject(Auth);
  private fireBaseFireStore = inject(Firestore);
  private wrapper = inject(FirebaseWrapperService);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.setPersistence();  // Ensure persistence is set
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  private setPersistence() {
    setPersistence(this.fireBaseAuth, browserLocalPersistence)
      .then(() => {
      })
      .catch((error) => {
      });
  }

  isLoggedIn(): Observable<User | null> {
    return this.user$;
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }


  // Register a new user
  register(email: string, password: string, username: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.fireBaseAuth, email, password)
      .then(response => {
        const userId = response.user.uid; // Get UserID
        const userDocRef = doc(this.fireBaseFireStore, 'users', userId); // Create a doc reference with UserID
            // Add UserID to Firestore `users` collection
            return setDoc(userDocRef, { userID: userId }).then(() => {
              // Update user's display name
              return updateProfile(response.user, { displayName: username }).then(() => {
                // Send email verification after registration
                return sendEmailVerification(response.user);
              });
            });
          });
    return this.wrapper.wrapRequest(promise);
  }


  // Login with email and password
  signIn(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.fireBaseAuth, email, password);
    return this.wrapper.wrapRequest(promise);
  }

  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.fireBaseAuth, provider).then(response => {
      const userId = response.user.uid; // Get UserID
      const userDocRef = doc(this.fireBaseFireStore, 'users', userId); // Create a doc reference with UserID
  
      // Add UserID to Firestore `users` collection if it doesn't already exist
      return setDoc(userDocRef, { userID: userId }, { merge: true }).then(() => {
        return response; // Return original response
      });
    });
    return this.wrapper.wrapRequest(promise);
  }
  

  // Send password reset email
  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.fireBaseAuth, email);
    return this.wrapper.wrapRequest(promise);
  }

  // Resend email verification
  resendVerificationEmail(): Observable<void> {
    const user = this.fireBaseAuth.currentUser;

    if (!user) {
      throw new Error('No authenticated user found.');
    }

    const promise = sendEmailVerification(user);
    return this.wrapper.wrapRequest(promise);
  }

  // Get current authenticated user
  getCurrentUser() {
    return this.fireBaseAuth.currentUser;
  }

  // Logout user
  logout(): Observable<void> {
    const promise = this.fireBaseAuth.signOut();
    return this.wrapper.wrapRequest(promise)
  }
}
