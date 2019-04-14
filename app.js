const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');
const typeButtons = document.querySelectorAll('.type');
let type = 'movie';
const API_KEY = '68ed6523';
let API_URL = '';


form.addEventListener('submit', formSubmitted);

typeButtons.forEach(function(el){
	el.addEventListener('click',function(){
		type = this.id;
		input.placeholder = `Enter a ${type} title`;
		constructUrl(type)
		 typeButtons.forEach(function(el){
		 	el.classList.toggle('active');
		 })
	});
});



function constructUrl(type) {
	type = type;
	API_URL = `https://www.omdbapi.com/?type=${type}&apikey=${API_KEY}&x&s=`;
}

function formSubmitted(event) {
	event.preventDefault();
	const searchTerm = input.value;
	if(searchTerm == '') {
		input.classList.add('has-error');
	} else {
		input.classList.remove('has-error');
		constructUrl(type);
		getResults(searchTerm)
		.then(showResults);
	}
	
}

function getResults(searchTerm) {
	const url = `${API_URL}${searchTerm}`;
	console.log(url);
	return fetch(url)
		.then(response => response.json())
		.then(data => data.Search);
}

function showResults(results) {
	console.log(results);
	resultsSection.innerHtml = '';
	let html = '';
	results.forEach(movie => {
		if(movie.Poster == 'N/A' || movie.Poster == null){
			movie.Poster = 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png';
		}
		html += `
			<div class="results-item col-12 col-sm-6 col-md-4">
				<div class="card">
				  <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
				  <div class="card-body">
				    <h5 class="card-title">${movie.Title}</h5>
				    <p class="card-text">${movie.Year}</p>
				  </div>
				  <div class="card-footer">
					<a class="btn btn-block btn-primary" target="_blank" href="http://imdb.com/title/${movie.imdbID}">
						Check on IMDB
					</a>
				  </div>
				</div>
			</div>
		`;
	});
	resultsSection.innerHTML = html;
}