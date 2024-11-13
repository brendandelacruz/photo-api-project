const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

function fetchPhotos(query) {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=tSXK6Rn64lPb0ViLcHAGxUJepAKgm_m2pmJ9iFguvAI`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            displayPhotoApp(data);
        } else if (this.readyState == 4) {
            console.error("Error fetching photos:", this.status, this.statusText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function displayPhotoApp(data) {
    var photos = data.results;
    var resultsContainer = document.querySelector("#results-container");

    // Clear previous images
    resultsContainer.innerHTML ='';

    photos.forEach(photo => {
        
        var photoContainer = document.createElement("div");
        photoContainer.innerHTML = `
            <img class="displayed-images" src="${photo.urls.regular}">
        `;
        resultsContainer.appendChild(photoContainer);
    });
}

// this function handles both the click of the search button and the enter since they are both of type submit in the form element
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if(query) {
        fetchPhotos(query);
    }
});

fetchPhotos("soccer");
// https://api.unsplash.com/search/photos?page=1&query=nature&client_id=[myAccessKey] 
// https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=[myAccessKey]