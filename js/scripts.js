//func that sets up pokemon list
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  
    //functions to add and and receive pokemon.
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


    //add button press functionality, refers to showDetails 
    function buttonListener(button, pokemon){
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
    })
  }

    // show details, refers to show modal.
    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        showModal(pokemon);
      })
    }


    //loads 150 pokemon api. stuff for loading info
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

    //loads specefic individual pokemon data
    function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response){
        return response.json();
      }).then(function (details){
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.id = details.id;
        item.type1 = details.types[0].type.name;
        try{item.type2 = details.types[1].type.name}
        catch(error){
          console.error(error);
        }
      }).catch(function (e){
        hideLoadingMessage();
        console.error(e);
      });
    }


    //stuff for loading... icon 
    function showLoadingMessage(pokemon){
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

    //show modal by adding .isvisible class
    function showModal(pokemon){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.add('is-visible');

      modalContainer.innerHTML = '';

      //create modal div
      let modal = document.createElement('div');
      modal.classList.add('modal');

      //add hideing functionality
      window.addEventListener('keydown', (e) =>{
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideModal();
        }
      });

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      // add stuff to modal
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = (pokemon.name);
      titleElement.classList.add('modal-title');

      let pokePic = document.createElement('div');
      pokePic.innerHTML = ("<img src = '" + pokemon.imageUrl + "' />");
      pokePic.classList.add('modal-pokePic');

      let pokeId = document.createElement('p');
      pokeId.innerText = ("id: " + pokemon.id);
      pokeId.classList.add('modal-pokeId');

      let pokeHeight = document.createElement('p');
      pokeHeight.innerText = ("height: " + pokemon.height);
      pokeHeight.classList.add('modal-pokeHeight');

      //handels possibility for two types
      let pokeType = document.createElement('p');
      if (pokemon.type2){
        pokeType.innerText = ("type: " + pokemon.type1 + ", " + pokemon.type2);
      }
      else{
        pokeType.innerText = ("type: " + pokemon.type1);
      }
      pokeType.classList.add('modal-pokeType');

      //arrow buttons
      let arrowright = document.createElement('button');
      arrowright.classList.add('modal-arrowright');
      arrowright.innerText = 'next';  
      arrowright.addEventListener('click', () => {
        pokePosition = (pokemon.id)
        if (pokePosition === 150){
          pokePosition = 0;
        }
        showDetails(pokemonList[pokePosition]);
      });
      
      let arrowleft = document.createElement('button');
      arrowleft.classList.add('modal-arrowleft');
      arrowleft.innerText = 'previous';
      arrowleft.addEventListener('click', () => {
        pokePosition = (pokemon.id - 2)
        if (pokePosition < 0){
          pokePosition = 149;
        }
        console.log(pokePosition);
        showDetails(pokemonList[pokePosition]);
      });

      let arrowdiv = document.createElement('div');
      arrowdiv.classList.add('modal-arrowdiv');

      let arrowdivright = document.createElement('span');
      arrowdivright.classList.add('modal-arrow-div-right');

      let arrowdivleft = document.createElement('span');
      arrowdivleft.classList.add('modal-arrow-div-left');
     


      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(pokePic);

      modal.appendChild(arrowdiv);
      arrowdivleft.appendChild(arrowleft);
      arrowdivright.appendChild(arrowright);
      arrowdiv.appendChild(arrowdivright);
      arrowdiv.appendChild(arrowdivleft);

      modal.appendChild(pokeId);
      modal.appendChild(pokeHeight);
      modal.appendChild(pokeType);
      modalContainer.appendChild(modal);




      //event listeners for buttons.

      
    }

    //hide modal function
    function hideModal(){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
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
      hideLoadingMessage: hideLoadingMessage,
      showModal: showModal
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


