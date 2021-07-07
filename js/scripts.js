//func that sets up pokemon list
let pokemonRepository = (function () {
    let pokemonList = [];
  
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
      console.log(pokemon);
    }

  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      buttonListener: buttonListener
    };

  })();



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



/* func for writeing to page 
pokemonRepository.getAll().forEach(function (pokemon){
  let pagelist = document.querySelector('.pokemon-page-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = (pokemon.name);
  button.classList.add("button2class");
  listItem.appendChild(button);
  pagelist.appendChild(listItem);
});   

*/ 


//get the pokemonList and throw it to the writeing function
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

