const PokeApi = `https://pokeapi.co/api/v2/pokemon/`
const pokeImages = "https://cdn.traction.one/pokedex/pokemon/"




class Pokemon {

    constructor() {
        this.pokemonList = new Array()
        this.pokemonSearchData = undefined;
        this.minimo = 1;
        this.maximo = 30;
    }

    async getPokemons() {

        for (let i = this.minimo; i <= this.maximo; i++) {

            const resp = await fetch(PokeApi + i);
            const data = await resp.json();

            this.pokemonList.push(data)

        }

        this.createCards(this.pokemonList)
    }

    createCards(pokemonLista) {

    
        pokemonLista.map(pokemon => {

            if(pokemon.id >= this.minimo){
            const pokemonCard = document.createElement('div')

            pokemonCard.classList.add("pokemonCard")


            pokemonCard.innerHTML = `
                
            <div id ="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                
                <span class="id">${this.idFormater(pokemon.id)}</span>            
                
                <img src="${pokeImages}${pokemon.id}.png" alt ="${pokemon.name}"class="pokeImage">
            
            
                
                </div>
                `
            document.getElementById("pokemonArea").appendChild(pokemonCard)

            this.typeFormater(pokemon.types, pokemon.name)
        }
        })

    }

    async search() {


        let pokemon = document.getElementById("pesquisa").value
        this.pokemonSearchData = undefined

        if (pokemon) {

            document.getElementById("pokemonArea").innerHTML=""
            document.getElementById("pesquisa").value = ""

            try{

                let pokemonSearch = await fetch(PokeApi + pokemon)
                this.pokemonSearchData = await pokemonSearch.json();    
                
            }catch{
                
                document.getElementById("pokemonArea").innerHTML=""
                document.getElementById("pokemonArea").innerHTML="<h1 id='erro'>Pokemon não encontrado</h1>"
                
            }
            
          
            const pokemonCard = document.createElement('div')

            pokemonCard.classList.add("pokemonCard")

            pokemonCard.innerHTML = `
                
            <div id ="${this.pokemonSearchData.name}">
                <h3>${this.pokemonSearchData.name}</h3>
                
                <span class="id">${this.idFormater(this.pokemonSearchData.id)}</span>            
                
                <img src="${pokeImages}${this.pokemonSearchData.id}.png" alt ="${this.pokemonSearchData.name}"class="pokeImage">
            
            
                
                </div>
                `
            document.getElementById("pokemonArea").appendChild(pokemonCard)

            this.typeFormater(this.pokemonSearchData.types, this.pokemonSearchData.name)
        }
    }


    idFormater(id) {

        if (id < 10) {
            id = "00" + id
        }

        if (id >= 10 && id < 100) {
            id = "0" + id
        }
        return id
    }

    typeFormater(type, name) {

        type.map(type => {

            const tipo = document.createElement("span")

            tipo.classList.add(type.type.name, "tipo")

            tipo.innerHTML = type.type.name

            document.getElementById(`${name}`).appendChild(tipo)

        })
    }

    loadMore(){
        console.log("oi")
        this.maximo += 30
        this.minimo += 30

        this.getPokemons()
    }

    pokemonFilter(){


        const filter = this.pokemonList.filter(pokemon =>pokemon.types[0].type.name == 'fire')
        document.getElementById("pokemonArea").innerHTML =""

        this.createCards(filter)
    }

}

let pokemons = new Pokemon()


window.addEventListener("load", pokemons.getPokemons())

document.getElementById("pesquisaC").addEventListener("submit", e => { e.preventDefault(); pokemons.search() })
