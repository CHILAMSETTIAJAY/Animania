function displayError(fieldId, errorMessage) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = errorMessage;
    errorDiv.style.display = 'block';
    setTimeout(function() {
      errorDiv.style.display = "none";
    }, 3000);
  }
  // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnyYghvHYwHY2Rbi5F1d6DuxVcnnAHEzI",
    authDomain: "hrwallpapers04.firebaseapp.com",
    projectId: "hrwallpapers04",
    storageBucket: "hrwallpapers04.appspot.com",
    messagingSenderId: "648756107215",
    appId: "1:648756107215:web:c8f135ceecb6d8443f64ba",
    measurementId: "G-4WBGN554DS"
  };
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = firebase.storage();

// Form submission event listener
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get file, category name, and image name inputs
    const file = document.getElementById('image').files[0];
    const categoryName = document.getElementById('category').value;
    const imageName = document.getElementById('imageName').value.toLowerCase();

    // Check if all inputs are provided
    if (file && categoryName && imageName) {
        // Create a storage reference
        const storageRef = storage.ref();

        // Define the paths to upload the image
        const allWallpapersPath = `AllWallpapers/${imageName}`;
        const categoryPath = `${categoryName}/${imageName}`;

        // Upload file to "AllWallpapers" folder
        const uploadTaskAll = storageRef.child(allWallpapersPath).put(file);

        // Upload file to category folder
        const uploadTaskCategory = storageRef.child(categoryPath).put(file);

        // Change button text to show progress
        const uploadButton = document.getElementById('uploadButton');

        // Monitor upload progress for "AllWallpapers" folder
        uploadTaskAll.on('state_changed', 
            function(snapshot){
                // Progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadButton.innerHTML = `Uploading... ${progress.toFixed(2)}%`;
            }, 
            function(error) {
                // Error
                console.error('Error uploading image to "AllWallpapers" folder:', error);
                uploadButton.innerHTML = 'Upload Image';
            }, 
        );

        // Monitor upload progress for category folder
        uploadTaskCategory.on('state_changed', 
            function(snapshot){
                // Progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadButton.innerHTML = `Uploading... ${progress.toFixed(2)}%`;
            }, 
            function(error) {
                // Error
                console.error(`Error uploading image to "${categoryName}" folder:`, error);
                uploadButton.innerHTML = 'Upload Image';
            }, 
            function() {
                // Upload complete
                displayError('uplodemsg', 'Image uploaded');
                // Reset button text
                uploadButton.innerHTML = 'Upload Image';
                // Reset form
                document.getElementById('uploadForm').reset();
            }
        );
    } else {
        // If any of the inputs are missing, show an error message
        alert('Please provide all the required information.');
    }
});


