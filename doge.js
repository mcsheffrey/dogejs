var body = document.getElementsByTagName('body')[0],
	words = ['wow', 'such', 'very', 'so', 'amaze'],
	textColors = ['0024ff', 'f90505', 'f98305', '27c20d', 'f905e5', 'ffea41', 'aa0ee4'],
	textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'p'],
	boringWords = ['a', 'or', 'at', "I'm", 'to', 'if', 'you', 'are', 'on', 'in', 'an', 'any']
	pageMeta = [],
	ignoreWords = ['the', 'and', ]
	textCount = 0,
	colorCount = 0,
	pageMetaCount = 0,
	numType = 'px',
	height = 0,
	width = 0,
	heightRandom = Math.random()*.75
	windowHeight = 768,
	windowWidth = 1024;

// Init - setup events
getViewportDimensions();
getPageMeta();

document.body.onclick = addDogeText;

/**
 * Get viewport dimensions
 */
function getViewportDimensions() {
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
    console.log(windowWidth, windowHeight);
    
}

function randomFromInterval(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}

/**
 * Fisher-yates shuffle
 */
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

/**
 * Generate random dimensions within screen bounds for text
 */
function randDimensions() {

}

/**
 * Get page meta
 */
function getPageMeta() {
	var arrayMethods = Object.getOwnPropertyNames( Array.prototype );

	arrayMethods.forEach( attachArrayMethodsToNodeList );

	function attachArrayMethodsToNodeList(methodName)
	{
	    NodeList.prototype[methodName] = Array.prototype[methodName];
	};

	textElements.forEach(function(elem){
		var matchingElems = document.getElementsByTagName(elem);

		matchingElems.forEach(function(matchingString){

			console.log(matchingString);
			

			var splitHTML = matchingString.textContent.split(' ');
			console.log(splitHTML);
			
			pageMeta = pageMeta.concat(splitHTML);
		});
	});

	shuffle(pageMeta);

	boringWords.forEach(function(word) {

		var wordIndex = pageMeta.indexOf(word);
		pageMeta.splice(wordIndex, 1);

	});

	console.log('pageMeta', pageMeta);
}

/**
 * Adds text overlay to screen
 */
function addDogeText() {
	console.log('something');
	console.log(windowHeight, windowWidth);
	console.log(randomFromInterval(0, windowHeight));
	
	var div = document.createElement('div');

	div.style.position = 'fixed';
	div.style.top = randomFromInterval(0, windowHeight/2) + 'px';
	div.style.left = randomFromInterval(0, windowWidth/2) + 'px';
	div.style.zIndex = 1000;
	div.style.fontSize = '64px';
	div.style.fontFamily = 'Comic Sans, Comic Sans MS, cursive';

	div.style.color = '#' + textColors[colorCount];
	div.innerHTML = words[textCount] + ' ' + pageMeta[pageMetaCount];

	body.appendChild(div);

	textCount++;
	colorCount++;
	pageMetaCount++;

	if (textCount === 4) {
		textCount = 0;
	};

	if (colorCount === 6) {
		colorCount = 0;
	};

	if (pageMetaCount === pageMeta.length) {
		pageMetaCount = 0;
	};
}