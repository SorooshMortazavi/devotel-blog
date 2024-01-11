const quotes = document.getElementById('quotes');
const error = document.getElementById('error');
const info = document.getElementById('info');

const firebaseConfig = {
  apiKey: "AIzaSyD7eloNrmnEb2CelajgHCBx5BxV6ALcn0Y",
  authDomain: "devotel-blog.firebaseapp.com",
  projectId: "devotel-blog",
  storageBucket: "devotel-blog.appspot.com",
  messagingSenderId: "648902562176",
  appId: "1:648902562176:web:0f310d68eb040057af7165"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const displayQuotes = (allQuotes) => {
  let html = '';
  for (const quote of allQuotes) {
    html += `<blockquote class="wp-block-quote">
                <p>${quote.quote}. </p><cite>${quote.character}</cite>
            </blockquote>`;
  }

  return html;
};
