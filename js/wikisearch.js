console.log("Wikisearch.js loaded!");

/*************** Variables ***************/
var apiWikiUrl = "https://en.wikipedia.org/w/api.php?callback=?" // URL for API-request
var articleId; //Variable to hold Wikipedia article ID.
var randomURL = "https://en.m.wikipedia.org/?curid=" //Base URL to use width article ID.
var wikiRandomOptions = {
							action: "query",
							list: "random",
							format: "json",
							rnnamespace: 0
						}
var wikiSearchOptions = {
							action: "opensearch",
							search: "tromsø",
							format: "json",
							limit: 20,
							namespace: 0,
							prop: "pageimages"
						}

/*************** Functions ***************/
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
	$.getJSON(apiWikiUrl, wikiRandomOptions, function(result) {
		articleId = (result.query.random[0].id);
		randomURL = checkScreen(randomURL);
		randomURL += articleId;
		setIframe(randomURL);
	});
}

/***** Function for requesting search results via API *****/
function getSearch(searchTerm) {
	wikiSearchOptions.search = searchTerm;
	$.getJSON(apiWikiUrl, wikiSearchOptions, function(result) {
		buildHTML(result);
	});
}

/***** Function for building HTML-results *****/
function buildHTML(result) {
	var htmlString = [];
	for (var i = 0; i < result[1].length; i++) {
		/* This is the HTML for the search-results */
		htmlString[i] = `<a class="result-link col-xs-12 col-sm-6 col-lg-3" href="${result[3][i]}" target="_blank">
	<div class="result-box">
		<h2 class="h2">${result[1][i]}</h2>
		<p>${result[2][i]}</p>
	</div>
</a>`
	}
	displayHTML(htmlString);
}

/***** Function for displaying search result on page *****/
function displayHTML(htmlString) {
	var htmlResult = "";
	for (var i = 0; i < htmlString.length; i++) {
		htmlResult += htmlString[i];
	}
	$("#display").html(htmlResult);	
}

//Executes when page is finished loading:
getRandom();

/*** Event for #new-article button. ***/
$("#new-article").on("click", function() {
	getRandom();
});

/*** Event for #search-field ***/
$("#search-field").on("change", function() {
	getSearch($("#search-field").val());
});



