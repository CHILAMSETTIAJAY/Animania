setTimeout(()=>{
  document.getElementById('splash').classList.toggle('fade');
},2000);

// Function to reload the page
function reloadPage(event) {
  event.preventDefault(); // Prevent the default behavior (page reload)
  // Add any custom logic here if needed
}

const firebaseConfig = {
  apiKey: "AIzaSyAnyYghvHYwHY2Rbi5F1d6DuxVcnnAHEzI",
  authDomain: "hrwallpapers04.firebaseapp.com",
  projectId: "hrwallpapers04",
  storageBucket: "hrwallpapers04.appspot.com",
  messagingSenderId: "648756107215",
  appId: "1:648756107215:web:c8f135ceecb6d8443f64ba",
  measurementId: "G-4WBGN554DS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Reference to the storage service
const storage = firebase.storage();

const imagesRef = storage.ref().child('TopWallpaper');

localStorage.setItem('lastClickedValue', "on");

// Get the current URL
const currentUrl = window.location.href;

// Get download URLs for all images in the folder
imagesRef.listAll().then((result) => {
  result.items.forEach((imageRef) => {
    const loadingImg = document.createElement('img');
    loadingImg.className = 'topimg';
    loadingImg.alt = imageRef.name;
    loadingImg.src = './Images/load2.gif'; // Set the loading image source

    const link = document.createElement('a');
    link.href = "image.html"; // Set the href attribute of the link
    link.appendChild(loadingImg); // Append the loading image to the link
    document.querySelector('.top-container').appendChild(link);

    // Get the download URL for each image
    imageRef.getDownloadURL().then((url) => {
      const img = document.createElement('img');
      img.className = 'topimg';

      img.onload = function () {
        link.removeChild(loadingImg); // Remove the loading image
        link.appendChild(img); // Append the actual image to the link
      };

      img.src = url; // Set the source of the actual image

      img.addEventListener('click', function () {
        localStorage.setItem('clickedImageUrl', url);
      });
    }).catch((error) => {
      console.error(error);
    });
  });
}).catch((error) => {
  console.error(error);
});

const anchorTags = document.querySelectorAll('.fetchtag');
anchorTags.forEach(function(anchorTag) {
  anchorTag.addEventListener('click', function(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Retrieve the inner HTML value of the clicked p tag
    const innerHTMLValue = this.querySelector('.fetch').textContent.trim();

    // Store the value in local storage
    localStorage.setItem('lastClickedValue', innerHTMLValue);
    window.location.href = "catdisplay.html";
  });
});

const dp = document.getElementById('dp');
const singupcancle = document.getElementById('singupcancle');
const singincancle = document.getElementById('singincancle');
const singup = document.getElementById('singup');
const singinlink = document.getElementById('singinlink');
const singuplink = document.getElementById('singuplink');
const accountcontainer = document.getElementById('accountcontainer');
const back = document.getElementById('back');
let displayname = document.getElementById('name');
let homename = document.getElementById('homename');
const displaydate = document.getElementById('date');
const currentDate = new Date();
// Options for formatting the date
const options = {
  month: 'long', // Display the full name of the month
  day: 'numeric', // Display the day of the month
  year: 'numeric' // Display the year
};

// Format the date
const formattedDate = currentDate.toLocaleString('en-US', options);

singinlink.addEventListener('click', function(event) {
  singup.style.display = 'none';
  singin.style.display = 'flex';

});

singuplink.addEventListener('click', function(event) {
  singin.style.display = 'none';
  singup.style.display = 'flex';

});

back.addEventListener('click', function(event) {
  event1.style.display = 'none';
});

singupcancle.addEventListener('click', function(event) {
  singup.style.display = 'none';
});
singincancle.addEventListener('click', function(event) {
  singin.style.display = 'none';
});

const db = firebase.database(); // Initialize database directly from the Firebase app instance

// Retrieve the value of event1 from localStorage
let event1 = singup;
// Set event1 to 'accountcontainer' if it's not already set
if (localStorage.getItem('event1') === 'accountcontainer') {
  event1 = accountcontainer;
}

dp.addEventListener('click', function(event) {
  event1.style.display = 'flex';
  // Update profile display elements
});

function displayError(fieldId, errorMessage) {
  const errorDiv = document.getElementById(fieldId);
  errorDiv.textContent = errorMessage;
  errorDiv.style.display = 'block';
  setTimeout(function() {
    errorDiv.style.display = "none";
  }, 3000);
}

// Function to clear error message for a specific field
function clearError(fieldId) {
  const errorDiv = document.getElementById(fieldId);
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
}

// Function to clear all error messages
function clearErrors() {
  const errorDivs = document.querySelectorAll('.error');
  errorDivs.forEach(function(errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  });
}

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

usernameInput.addEventListener('input', function() {
  const username = usernameInput.value;
  if (username.length >= 4) {
    clearError('usernameError');
  }
});

// Event listener for password input
passwordInput.addEventListener('input', function() {
  const password = passwordInput.value;
  if (password.length >= 8 && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
    clearError('passwordError');
  }
});

// Function to check if username already exists in storage
async function checkUsernameExists(username) {
  const snapshot = await db.ref('user/' + username).once('value');
  return snapshot.exists();
}

function changeToSVG(btn) {
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="loadersvg"  style="fill: rgb(255, 255, 255);transform: ;msFilter:;"><circle cx="12" cy="20" r="2"></circle><circle cx="12" cy="4" r="2"></circle><circle cx="6.343" cy="17.657" r="2"></circle><circle cx="17.657" cy="6.343" r="2"></circle><circle cx="4" cy="12" r="2.001"></circle><circle cx="20" cy="12" r="2"></circle><circle cx="6.343" cy="6.344" r="2"></circle><circle cx="17.657" cy="17.658" r="2"></circle></svg>'; // Replace '...' with your SVG content
}

// Function to revert the button's innerHTML back to the original text
function revertToText(btn, value) {
  btn.innerHTML = value;
}

const singupbtn = document.getElementById('singupbtn');

singupbtn.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Get user input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const profileImage = document.getElementById('fileInput').files[0]; // Get the selected image file

  let valid = true; // Flag to track if form submission should proceed

  // Reset any previous error messages
  clearErrors();

  // Perform username validation
  if (username.length < 4) {
    displayError('usernameError', 'Username must be at least 4 characters long.');
    valid = false;
  }

  // Perform password validation
  if (password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
    displayError('passwordError', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    valid = false;
  }

  // Perform username and password consecutive spaces validation
  if (!/^\S*(?=\S{2})\S*$/.test(username)) {
    displayError('usernameError', 'Username cannot contain consecutive spaces.');
    valid = false;
  }
  if (!/^\S*(?=\S{2})\S*$/.test(password)) {
    displayError('passwordError', 'Password cannot contain consecutive spaces.');
    valid = false;
  }

  // Perform profile image presence validation
  if (!profileImage) {
    displayError('fileInputError', 'Upload an image for profile picture.');
    valid = false;
  }

  if (valid) {
    // Perform username existence check
    checkUsernameExists(username)
      .then((exists) => {
        if (exists) {
          displayError('usernameError', 'Username already in use. Please choose a different one.');
        } else {
          // If username is available, proceed with form submission
          signup(username, password, profileImage);
        }
      })
      .catch((error) => {
        console.error('Error checking username existence:', error);
      });
  }
});

function signup(username, password, profileImage) {
  // Create a storage reference for the image
  const storageRef = firebase.storage().ref('profile_images/' + username + '_' + profileImage.name);

  // Declare downloadURL variable here
  let downloadURL;

  // Upload the image file to Firebase Storage
  const uploadTask = storageRef.put(profileImage);
  const originalText = singupbtn.innerHTML;

  displayError('singupmsg', 'Signing up, please wait...');
   // Change button to loading state

  // Wait for the image upload to complete
  uploadTask.then((snapshot) => {
    // Get the download URL for the uploaded image
    return snapshot.ref.getDownloadURL();
  }).then((url) => {
    // Save the download URL to the variable
    downloadURL = url;

    // Save user information and image URL to the database
    return db.ref('user/' + username).set({
      username: username,
      password: password,
      profileImageURL: downloadURL, // Save the image URL to the database
      joined: formattedDate
    });
  }).then(() => {
    // Update UI after successful signup
    singup.style.display = 'none';
    singin.style.display = 'none';
    localStorage.setItem('event1', 'accountcontainer');

    localStorage.setItem('storedUsername', username);
    // Update the profile image tag with the profile image URL
    localStorage.setItem('storedProfileImageURL', downloadURL);
    localStorage.setItem('joineddate', formattedDate);
    displayError('singupmsg', 'Signed up successfully.');
    location.reload(); // Refresh the page or perform any other necessary actions
  }).catch((error) => {
    // Handle errors
    console.error('Error signing up:', error);
    displayError('singupmsg', 'Error signing up. Please try again.');
  }).finally(() => {
    revertToText(singupbtn, originalText); // Revert button to original state
  });
}

function clearErrors() {
  // Clear any previous error messages
  // Assuming you have functions to clear errors for each field
  clearError('usernameError');
  clearError('passwordError');
  clearError('fileInputError');
  clearError('singupmsg');
}

function clearError(id) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function displayError(id, message) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function changeToSVG(element) {
  // Implement your logic to change button to loading state
}

function revertToText(element, originalText) {
  // Implement your logic to revert button to original state
}


// Event listener for signing in
const singinbtn = document.getElementById('singinbtn');
singinbtn.addEventListener('click', function(e) {
  e.preventDefault();

  const username = document.getElementById('loginusername').value;
  const password = document.getElementById('loginpassword').value;
  const orginaltetx = singinbtn.innerHTML;

  changeToSVG(singinbtn);
  displayError('singinmsg', 'Signingin please wait.....');
  // Retrieve user details from Firebase
  db.ref('user/' + username).once('value').then((snapshot) => {
    const user = snapshot.val();

    if (user && user.password === password) {
      // Sign in successful
      singup.style.display = 'none';
      singin.style.display = 'none';

      // Update the value of event1 to 'accountcontainer' in localStorage
      localStorage.setItem('event1', 'accountcontainer');
      // Update localStorage with user details
      localStorage.setItem('storedUsername', user.username);
      localStorage.setItem('storedProfileImageURL', user.profileImageURL);
      localStorage.setItem('joineddate', user.joined);
      displayError('singinmsg', 'Signed in successfully.');

      location.reload();

    } else {
      // Incorrect username or password
      revertToText(singinbtn, orginaltetx);
      displayError('singinmsg', 'Incorrect username or password.');

    }
  }).catch((error) => {
    displayError('singinpmsg', 'Error signing in.');
  });
});

// // Get the logout button element
// const logoutButton = document.getElementById('logout');
// logoutButton.innerHTML = 'Logout';
// // Add click event listener to the logout button
// logoutButton.addEventListener('click', function() {
//   logoutButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="loadersvg"  style="fill: rgb(255, 255, 255);transform: ;msFilter:;"><circle cx="12" cy="20" r="2"></circle><circle cx="12" cy="4" r="2"></circle><circle cx="6.343" cy="17.657" r="2"></circle><circle cx="17.657" cy="6.343" r="2"></circle><circle cx="4" cy="12" r="2.001"></circle><circle cx="20" cy="12" r="2"></circle><circle cx="6.343" cy="6.344" r="2"></circle><circle cx="17.657" cy="17.658" r="2"></circle></svg>';
//   // Remove all values from localStorage
//   localStorage.clear();
//   // Refresh the page
//   location.reload();
// });

displayname.innerHTML = localStorage.getItem('storedUsername') || 'Login';
dp.src = localStorage.getItem('storedProfileImageURL') || './Images/account.png';
if(localStorage.getItem('storedUsername') != null) {
  // document.getElementById('logout').style.display = 'flex';
  document.getElementById('mobile-menu').style.display = 'flex';

}


const searchtext = document.getElementById('searchtext');

searchtext.addEventListener('keypress', function(event) {
  // Check if the Enter key was pressed (key code 13)
  if (event.key === 'Enter') {
    const searchTextValue = searchtext.value;
    localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage

    if (searchTextValue.trim() !== '') {
      window.location.href = `search.html?search=${encodeURIComponent(searchTextValue)}`;
    }
  }
});

document.getElementById("searchicon").addEventListener("click", function() {
  const searchTextValue = searchtext.value;
  localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage

  if (searchTextValue.trim() !== '') {
    window.location.href = `search.html?search=${encodeURIComponent(searchTextValue)}`;
  }
});

const picsearch = document.getElementById('picsearch');
picsearch.addEventListener('click',function(){
   displayError('SearchError', 'We are working on this future');

})

document.getElementById("voiceicon").addEventListener("click", function() {
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
      searchtext2.value = event.results[0][0].transcript;
      recognition.stop();
      const searchTextValue = searchtext2.value;
      localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage

      if (searchTextValue.trim() !== '') {
        window.location.href = `search.html?search=${encodeURIComponent(searchTextValue)}`;
      }
  };
});

document.addEventListener('DOMContentLoaded', function() {
  const menuItem = document.querySelector('.mobilemenu-item');
  menuItem.addEventListener('mouseover', function() {
    // Change color to white after 1 second
    setTimeout(function() {
      menuItem.style.color = 'white';
    }, 1000);
  });
});

// document.getElementById('Contact').addEventListener('click', function(event) {
//   event.preventDefault();

//   // Define the email address and subject
//   const emailAddress = 'animania@example.com';
//   const subject = 'Inquiry';

//   // Construct the mailto URL
//   const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;

//   // Open the user's default email client
//   window.location.href = mailtoUrl;
// });