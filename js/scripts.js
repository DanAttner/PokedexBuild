let pokemonList= [];



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


//pushing objects to array
pokemonList.push(bulbasaur, ivysaur, venusaur);

console.log(pokemonList);


//loop for writeing out names and heights
for (let i =0; i < pokemonList.length; i++){
    
    document.write(pokemonList[i].name + " " + pokemonList[i].height);

    // if height is taller than 1, write something
    if (pokemonList[i].height > 1){
        document.write("  - Wow, that is a big pokemon!")
    }


    document.write("<br>");



};