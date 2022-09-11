import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAMBkKzU5Gs5BcwRwBfoMEG6f-HYq8OUgU",
  authDomain: "notetaking-app-38592.firebaseapp.com",
  projectId: "notetaking-app-38592",
  storageBucket: "notetaking-app-38592.appspot.com",
  messagingSenderId: "684889739385",
  appId: "1:684889739385:web:bb9b93eb959a231ad404a8",
  measurementId: "G-9WJ5E7QCJ1"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);


export default App