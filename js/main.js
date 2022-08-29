document.getElementById('form1').addEventListener('submit', searchTitles);
function startLoad(){
	document.getElementById('loader').style.display = 'block';
	document.getElementById('movies').innerHTML = '';
	document.getElementById('movies').style.display = 'none';
}
function finalLoad(){
	document.getElementById('loader').style.display = 'none';
	document.getElementById('movies').style.display = 'block';
}
function searchTitles(e){
	let titleSearch = document.getElementById('search').value;
	let countrySearch = document.getElementById('country').value;
	findTitles(titleSearch, countrySearch);
	e.preventDefault();
}
function findTitles(title, country){
	startLoad()
	axios.get('https://apis.justwatch.com/content/titles/'+ country +'/popular?body={"content_types":["show","movie"],"providers":["nfx"],"page":1,"page_size":10,"query":"'+ title +'"}')

  .then(function (response) {
	let responseTitles = response.data.items;
	let html = '';
	let netflixLink = '';
	for (let i = 0; i < responseTitles.length; i++){
		let responseOffers = responseTitles[i].offers;
		for (let j= 0; j < responseOffers.length; j++){
			if (responseOffers[j].provider_id == 8){
				netflixLink = responseOffers[j].urls.standard_web;
				break;
			}
		}

		html += `
		<a href="${netflixLink}" target="_blank"><h4>${responseTitles[i].title}</h4></a><br>

		`;
	}

	if (!responseTitles.length){
		html = '<h5>This title does not exist on netflix :(</h5>';
	}
	document.getElementById('movies').innerHTML = html;

  })
  .finally(() => finalLoad ())
  .catch(function (error) {
    console.log(error);
  });

}
