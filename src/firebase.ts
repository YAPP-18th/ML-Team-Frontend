import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDVd6d7UlWK96gK4F-URe7cGDzbGhByyZA',
  authDomain: 'studeep.firebaseapp.com',
  projectId: 'studeep',
  storageBucket: 'studeep.appspot.com',
  messagingSenderId: '424037183060',
  appId: '1:424037183060:web:cd7a03ce9d44eeb79c47c1',
  measurementId: 'G-YRF9D3VS2F',
};
export const firebaseApp = initializeApp(firebaseConfig);
