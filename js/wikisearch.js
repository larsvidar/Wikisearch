console.log("Wikisearch.js loaded!");

/*************** VARIABLES ***************/
var apiWikiUrl = "https://en.wikipedia.org/w/api.php?callback=?" // URL for API-request
var articleId; //Variable to hold Wikipedia article ID.
var randomURL = "https://en.m.wikipedia.org/?curid=" //Base URL to use width article ID.
var $display = $("#display").children();
var backButton = `<button id="back-button" class="btn btn-primary btn-block mb-3 mt-2">Get random article</button>`
var wikiRandomOptions = {
							action: "query",
							list: "random",
							format: "json",
							rnnamespace: 0
						}
var wikiSearchOptions = {
							action: "opensearch",
							search: "",
							format: "json",
							limit: 12,
							namespace: 0,
							prop: "pageimages"
						}

						
/*************** FUNCTIONS ***************/
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
		<h4 class="h4">${result[1][i]}</h4>
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
	htmlResult += backButton;
	$("#display").html(htmlResult);
}

/***** Function to display random page again *****/
function backToRandom() {
	$("#display").html($display);
	getRandom();
}


/*************** EVENTS ***************/
/*** Event for #new-article button. ***/
$("#new-article").on("click", function() {
	getRandom();
});

/*** Event for #search-field ***/
$("#search-field").on("change", function() {
	getSearch($("#search-field").val());
});

/*** Event for #back-button ***/
$("#display").on("click", "#back-button", backToRandom);


//Executes when page is finished loading:
getRandom();



