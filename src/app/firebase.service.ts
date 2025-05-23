import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithCredential,  deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config';  // Import Firebase configuration
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app;
  private auth;
  private firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  // Login with email and password
  loginWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register with email and password
  registerWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Sign out user
  async signOutUser() {
    try {
      await signOut(this.auth);
      return true; // Return true for successful sign out
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error signing out: ' + error.message);
      } else {
        throw new Error('Error signing out: Unknown error');
      }
    }
  }

  async deleteUserAccount(password: string) {
    const user = this.auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential); // Re-authenticate the user

        await deleteUser(user); // Delete the account
        return true; // Return true for successful account deletion
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error('Error deleting account: ' + error.message);
        } else {
          throw new Error('Error deleting account: Unknown error');
        }
      }
    } else {
      throw new Error('No user is logged in');
    }
  }
  
  // Google sign-in
  async googleSignIn() {
    try {
      // Ensure the GoogleSignInClient is initialized
      const googleUser = await GoogleAuth.signIn();

      if (!googleUser) {
        throw new Error('Google sign-in failed: No user returned.');
      }

      // Use the Google token to authenticate with Firebase
      const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
      const auth = getAuth();
      const userCredential = await signInWithCredential(auth, credential);

      console.log('User signed in:', userCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  getAuth() {
    return getAuth(this.app);
  }

  // Firestore save user data
  async saveUserData(userId: string, data: any) {
    const userDocRef = doc(this.firestore, 'users', userId);
    await setDoc(userDocRef, data);
  }

  // Firestore get user data
  async getUserData(userId: string) {
    const userDocRef = doc(this.firestore, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}
