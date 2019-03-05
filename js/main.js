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
	var titleSearch = document.getElementById('search').value;
	var countrySearch = document.getElementById('country').value;
	console.log(countrySearch);
	findTitles(titleSearch, countrySearch);

	e.preventDefault();
}
function findTitles(title, country){
	startLoad()
	axios.get('https://apis.justwatch.com/content/titles/'+ country +'/popular?body={"content_types":["show","movie"],"providers":["nfx"],"page":1,"page_size":10,"query":"'+ title +'"}')

  .then(function (response) {
    console.log(response);
	var responseTitles = response.data.items;
	var html = '';
	for (var i = 0; i < responseTitles.length; i++){
		var responseOffers = responseTitles[i].offers;
		for (var j= 0; j < responseOffers.length; j++){
			if (responseOffers[j].provider_id == 8){
				var netflix_link = responseOffers[j].urls.standard_web;
				break;
			}
		}

		html += `
		<a href="${netflix_link}" target="_blank"><h4>${responseTitles[i].title}</h4></a><br>

		`;
	}
	if (responseTitles == ''){
		html = '<h5>This title does not exist on netflix :(</h5>';
	}
	document.getElementById('movies').innerHTML = html;

  })
  .finally(() => finalLoad ())
  .catch(function (error) {
    console.log(error);
  });

}
