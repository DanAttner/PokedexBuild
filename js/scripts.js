let pokemonRepository = (function () {
    let pokemonList = [];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
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


//pushing objects to array
pokemonRepository.add(bulbasaur);
pokemonRepository.add(ivysaur);
pokemonRepository.add(venusaur);
pokemonRepository.add(mewtwo);




function writeInfo(pokemon) {
    document.write(pokemon.name + " " + pokemon.height);

    // if height is taller than 1, write something
    if (pokemon.height > 1){
        document.write("  - Wow, that is a big pokemon!");
    }
    document.write("<br>");
}

//get the pokemonList and throw it to the writeing function
pokemonRepository.getAll().forEach(writeInfo);