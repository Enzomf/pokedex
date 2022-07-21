const PokeApi = `https://pokeapi.co/api/v2/pokemon/`
const pokeImages = "https://cdn.traction.one/pokedex/pokemon/"




class Pokemon {

    constructor() {
        this.pokemonList = new Array()
        this.pokemonSearchData = undefined;
        this.minimo = 1;
        this.maximo = 30;
    }

    async getPokemons(controle) {

        for (let i = this.minimo; i <= this.maximo; i++) {

            const resp = await fetch(PokeApi + i);
            const data = await resp.json();

            this.pokemonList.push(data)

        }

        if(!controle){
        this.createCards(this.pokemonList)
      
        }
    }

    createCards(pokemonLista) {


        pokemonLista.map(pokemon => {

            if (pokemon.id >= this.minimo) {
                const pokemonCard = document.createElement('div')

                pokemonCard.classList.add("pokemonCard")


                pokemonCard.innerHTML = `
                
            <div id ="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                
                <span class="id">${this.idFormater(pokemon.id)}</span>            
                <div class="imageArea">
                    <img src="${pokeImages}${pokemon.id}.png" alt ="${pokemon.name}"class="pokeImage">
                </div>
            
                
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

            document.getElementById("pokemonArea").innerHTML = ""
            document.getElementById("pesquisa").value = ""

            try {

                let pokemonSearch = await fetch(PokeApi + pokemon)
                this.pokemonSearchData = await pokemonSearch.json();

            } catch {

                document.getElementById("pokemonArea").innerHTML = ""
                document.getElementById("pokemonArea").innerHTML = "<h1 id='erro'>Pokemon não encontrado</h1>"

            }


            const pokemonCard = document.createElement('div')

            pokemonCard.classList.add("pokemonCard")

            pokemonCard.innerHTML = `
                
            <div id ="${this.pokemonSearchData.name}">
                <h3>${this.pokemonSearchData.name}</h3>
                
                <span class="id">${this.idFormater(this.pokemonSearchData.id)}</span>            
                
                <div class ="imageArea">
                    <img src="${pokeImages}${this.pokemonSearchData.id}.png" alt ="${this.pokemonSearchData.name}"class="pokeImage">
                </div>
            
                
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

    loadMore() {
        console.log("oi")
        this.maximo += 30
        this.minimo += 30

        this.getPokemons()
    }

   async pokemonFilter() {

        let tipo = document.getElementById("filter").value
        tipo = tipo.toLowerCase()

        this.minimo = 1;
        this.maximo =150;

        this.pokemonList.length=0
        await this.getPokemons(1)

        if (tipo) {

            const filter = this.pokemonList.filter(pokemon => pokemon.types[0].type.name == tipo)
            document.getElementById("pokemonArea").innerHTML = ""
            
           filter.length == 0 ?  document.getElementById("pokemonArea").innerHTML = "<h1 class ='erro'> nenhuma correspondencia encontrada nesse intervalo </h1>":this.createCards(filter)
        }
    }


}

let pokemons = new Pokemon()


window.addEventListener("load", pokemons.getPokemons())

document.getElementById("pesquisaC").addEventListener("submit", e => { e.preventDefault(); pokemons.search() })
document.getElementById("filtrar").addEventListener("click", w=>{pokemons.pokemonFilter()})