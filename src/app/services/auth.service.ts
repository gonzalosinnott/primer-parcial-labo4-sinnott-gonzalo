import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';


import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { of } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any; // Save logged in user data
  now = new Date();
 
  constructor(private auth: Auth,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore, // Inject Firebase auth service
    ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then((result) => {      
      this.SetUserData(result.user);     
    })
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((result) => {
      this.SetUserData(result.user);
    })
  }

  register({ email, user, password }: RegisterData) {
    console.log(email, user, password);
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(credential => {
      credential.user.updateProfile({
        displayName: user,
     })
      this.SetUserData(credential.user);
    })
  }

  logout() {
    return signOut(this.auth)
    .then((result) => {
      localStorage.removeItem('user');      
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users-registry/${user.uid}`
    );

    const userLog: AngularFirestoreDocument<any> = this.afs.doc(
      `users-log/${this.now}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    const userDataLog: any = {
      displayName: user.displayName,
      email: user.email,
      loginDate : this.now.toLocaleString()
    };

    userLog.set(userDataLog, {
      merge: false,
    });
    
    return userRef.set(userData, {
      merge: true,
    });
  }

  getAuth() {
    return this.afAuth.authState;
  }
 
  getUserRole() {
    return this.afs.collection('users-registry').doc(this.auth.currentUser.uid).valueChanges();
  }

  setProduct(data: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `empleados/${data.id}`
    );

    const survey: any = {
      name: data.name,
      id: data.id,
      age: data.age,
      capacity: data.capacity,
      ownTransport:  data.ownTransport === true ? true : false ,
      country: data.country,
    };
 
    return userRef.set(survey, {
      merge: true,
    });
  } 
}
