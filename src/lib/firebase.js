import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Desi Hut MJM Restaurant — Firebase project
const firebaseConfig = {
  apiKey: 'AIzaSyCCrLjOYZX_ePa5WoF7dvbX54RIgqx7c-w',
  authDomain: 'desihutmjm-3bc34.firebaseapp.com',
  projectId: 'desihutmjm-3bc34',
  storageBucket: 'desihutmjm-3bc34.firebasestorage.app',
  messagingSenderId: '407254226937',
  appId: '1:407254226937:web:e5cf16a1150eb51a160f28',
  measurementId: 'G-JNXH3R4G0N'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

/** Normalize a Firebase Auth user to the shape the app expects. */
export const normalizeUser = (fbUser) => {
  if (!fbUser) return null
  return {
    id: fbUser.uid,
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName || '',
    app_metadata: {}
  }
}

/** Convert a Firestore Timestamp (or ISO string) to a JS Date safely. */
export const tsToDate = (ts) => {
  if (!ts) return new Date(0)
  if (typeof ts.toDate === 'function') return ts.toDate()
  return new Date(ts)
}
