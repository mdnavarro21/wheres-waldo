const config = {
    apiKey: "AIzaSyDAZFHgssYqJIAgwAi5FDn13bWTyZQts70",
    authDomain: "wheres-waldo-ef642.firebaseapp.com",
    projectId: "wheres-waldo-ef642",
    storageBucket: "wheres-waldo-ef642.appspot.com",
    messagingSenderId: "563947798058",
    appId: "1:563947798058:web:cc2aa1cdc4afc5f00e0d53"
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }