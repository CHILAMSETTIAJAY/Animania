
let flag = true;
function loadImages() {
document.getElementById('featured-title').innerHTML = localStorage.getItem('searchtext');
    let searchtext =localStorage.getItem('searchtext').toLowerCase();
    let searchTerms = searchtext.split(" ");
    
    if (searchTerms.length >= 2) {
        searchTerms = searchTerms.filter(term => !term.includes("wall"));
    }
    console.log(searchTerms)

    if (!firebase.apps.length) {
        // Your Firebase configuration
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
        firebase.initializeApp(firebaseConfig);
    }


// Reference to the storage service
const storage = firebase.storage();

// Reference to the images folder
const imagesRef = storage.ref('AllWallpapers');

  // Get download URLs for all images in the folder
  imagesRef.listAll().then((result) => {
    result.items.forEach((imageRef) => {
        // Get the name of the image and convert it to lowercase
        const imageName = imageRef.name.toLowerCase();

            // Check if the image name contains all search terms
            const match = searchTerms.some(term =>imageName.includes(term.slice(0, 4)) || imageName === term);


        // Check if the image name contains the search text
        if (match) {
            flag = false;
            // Create a placeholder loading image
            const loadingImg = document.createElement('img');
            loadingImg.className = 'topimg';
            loadingImg.alt = searchtext;
            loadingImg.src = './Images/load2.gif'; // Set the loading image source

            // Append the loading image to the top container
            const link = document.createElement('a');
            link.href = "image.html"; // Set the href attribute of the link
            link.appendChild(loadingImg); // Append the loading image to the link
            document.querySelector('.top-container').appendChild(link);

            // Get the download URL for the image
            imageRef.getDownloadURL().then((url) => {
                // Create an image element and set its source to the URL
                const img = document.createElement('img');
                img.className = 'topimg';

                // Once the actual image is loaded, replace the loading image with it
                img.onload = function() {
                    // Replace the loading image with the actual image
                    link.removeChild(loadingImg); // Remove the loading image
                    link.appendChild(img); // Append the actual image to the link
                };

                img.src = url; // Set the source of the actual image

                // Add click event listener to dynamically created images
                img.addEventListener('click', function() {
                    // Store the clicked image URL in localStorage
                    localStorage.setItem('clickedImageUrl', url);
                });
            }).catch((error) => {
                // Handle any errors
                console.error(error);
            });
        }
    });
    if(flag){
        displayError('SearchError', 'No matches found for search.');
    
      }
}).catch((error) => {
    // Handle any errors
    console.error(error);
});

}
// Load images based on the initial search text
loadImages();

const searchtext2 = document.getElementById('searchtext2');
searchtext2.addEventListener('keypress', function(event) {
  // Check if the Enter key was pressed (key code 13)
  if (event.key === 'Enter') {
    const searchTextValue = searchtext2.value;
    localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage
    document.querySelector('.top-container').innerHTML = '';

// Load images based on the updated search text
loadImages();
  }
});

document.getElementById("searchicon").addEventListener("click", function() {
    const searchTextValue = searchtext2.value;
    localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage
  
    if (searchTextValue.trim() !== '') {
      window.location.href = `search.html?search=${encodeURIComponent(searchTextValue)}`;
    }
  });

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
function displayError(fieldId, errorMessage) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = errorMessage;
    errorDiv.style.display = 'block';
    setTimeout(function() {
      errorDiv.style.display = "none";
    }, 3000);
  }



 const picsearch = document.getElementById('picsearch');
 picsearch.addEventListener('click',function(){
    displayError('SearchError', 'We are working on this future');

 })

document.getElementById('name').innerHTML = localStorage.getItem('storedUsername') || 'Animania';
document.getElementById('dp').src = localStorage.getItem('storedProfileImageURL') || './Images/my4dp.png';