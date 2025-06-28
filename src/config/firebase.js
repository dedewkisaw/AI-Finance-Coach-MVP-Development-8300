import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Demo configuration - replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization failed, using mock auth:', error);
  // Fallback for demo purposes
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'demo-user', email: 'demo@example.com' } }),
    createUserWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'demo-user', email: 'demo@example.com' } }),
    signOut: () => Promise.resolve()
  };
}

export { auth };
export default app;