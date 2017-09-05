console.log("Wikisearch.js loaded!");

var apiRandomWikiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&callback=?"; // URL for API-request
var articleId; //Variable to hold Wikipedia article ID.
var randomURL = "https://en.m.wikipedia.org/?curid=" //Base URL to use width article ID.


/***** Function for passing randomURL to #iframe and #open-button *****/
function setIframe(url) {
	$("#iframe").attr("src", url);
	$("#open-button").attr("href", url);
}

/***** Function for checking screensize and using mobile version on small screens *****/
function checkScreen() {
	if (window.innerWidth > 760) {
		return "https://en.wikipedia.org/?curid="
	} else {
		return "https://en.m.wikipedia.org/?curid="
	}
}

/***** Function for requesting random page via API *****/
function getRandom() {
	$.getJSON(apiRandomWikiUrl, function(data) {
		articleId = (data.query.random[0].id);
		randomURL = checkScreen(randomURL);
		randomURL += articleId;
		setIframe(randomURL);
	});
}

getRandom();

/*** Event for #new-article button. ***/
$("#new-article").on("click", function() {
	getRandom();
});





