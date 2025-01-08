import { inject, Injectable } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  updateProfile, 
  user,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { FirebaseWrapperService } from '../wrapper/firebase-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fireBaseAuth = inject(Auth);
  private wrapper = inject(FirebaseWrapperService);
  private userSubject = new BehaviorSubject<User | null>(null);
  public $user = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.fireBaseAuth, (user) => {
      this.userSubject.next(user);
    });
  }
  // Register a new user
  register(email: string, password: string, username: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.fireBaseAuth, email, password)
      .then(response => {
        // Update user's display name
        return updateProfile(response.user, { displayName: username })
          .then(() => {
            // Send email verification after registration
            return sendEmailVerification(response.user);
          });
      });
    return from(promise);
  }

  // Login with email and password
  signIn(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.fireBaseAuth, email, password);
    return this.wrapper.wrapRequest(promise);
  }

  // Login with Google account
  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.fireBaseAuth, provider);
    return from(promise);
  }

  // Send password reset email
  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.fireBaseAuth, email);
    return from(promise);
  }

  // Resend email verification
  resendVerificationEmail(): Observable<void> {
    const user = this.fireBaseAuth.currentUser;

    if (!user) {
      throw new Error('No authenticated user found.');
    }

    const promise = sendEmailVerification(user);
    return from(promise);
  }

  // Get current authenticated user
  getCurrentUser() {
    return this.fireBaseAuth.currentUser;
  }

  // Logout user
  logout(): Observable<void> {
    const promise = this.fireBaseAuth.signOut();
    return from(promise);
  }
}
