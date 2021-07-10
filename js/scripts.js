//func that sets up pokemon list
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let pagelist = document.querySelector('.pokemon-page-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = (pokemon.name);
      button.classList.add("button2class");
      listItem.appendChild(button);
      pagelist.appendChild(listItem);

      buttonListener(button,pokemon);
      
    }

    function buttonListener(button, pokemon){
      button.addEventListener('click', function (event) {
        showDetails(pokemon)
    })
  }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        console.log(pokemon);
      })
    }

    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response){
        return response.json();
      }).then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item){
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e){
        hideLoadingMessage();
        console.error(e);
      })
    }

    function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response){
        return response.json();
      }).then(function (details){
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e){
        hideLoadingMessage();
        console.error(e);
      });
    }

    function showLoadingMessage(){
      loadingMessage = document.querySelector('#loadring');
      let isHidden = loadingMessage.classList.contains('hidden');
      if(isHidden){
        loadingMessage.classList.remove('hidden');
      }
    }

    function hideLoadingMessage(){
      loadingMessage = document.querySelector('#loadring');
      let isHidden = loadingMessage.classList.contains('hidden');
      if(!isHidden){
        loadingMessage.classList.add('hidden');
      }

    }

    
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      buttonListener: buttonListener,
      loadList: loadList,
      loadDetails: loadDetails,
      showLoadingMessage: showLoadingMessage,
      hideLoadingMessage: hideLoadingMessage
    };

  })();

pokemonRepository.loadList().then(function(){
  //now the data is loaded
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
  //now the data is added to our HTML as list items and buttons
  });



//right out of the gate we have loadlist (which takes 150 pokemon and adds them to list)
//and we have addListItem which puts them all as list items and buttons to be clicked on.

//THEN when clicking the button we take the individual pokemon URL, and get a picture, height,
//and type details and throws them into the console log.



/*



// createing objects
let bulbasaur = {
    name:'Bulbasaur',
    number: 1,
    height: 0.7,
    type: ['grass','poison']
};

let ivysaur = {
    name:'Ivysaur',
    number: 2,
    height: 1,
    type: ['grass','poison']
};

let  = venusaur = {
    name:'Venusaur',
    number: 3,
    height: 2,
    type: ['grass','poison']
};

let mewtwo = {
    name: "Mewtwo",
    number: 150,
    height: 2,
    type: ['psychic']
};


//pushing objects to array. could add another array and loop to streamline the adding process. 
pokemonRepository.add(bulbasaur);
pokemonRepository.add(ivysaur);
pokemonRepository.add(venusaur);
pokemonRepository.add(mewtwo);



// func for writeing to page 
pokemonRepository.getAll().forEach(function (pokemon){
  let pagelist = document.querySelector('.pokemon-page-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = (pokemon.name);
  button.classList.add("button2class");
  listItem.appendChild(button);
  pagelist.appendChild(listItem);
});   




pokemonRepository.getAll().forEach(pokemonRepository.addListItem);





*/