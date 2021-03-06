document.getElementById("pesquisaC").addEventListener("submit", e=>{e.preventDefault()})

let PokeApi = `https://pokeapi.co/api/v2/pokemon/`
let pokemonList = new Array()
let ContagemPokemon = 52;
let minimo = 1

let det = new Array()

const ApiEspecies = "https://pokeapi.co/api/v2/pokemon-species/"


function carregarMais() {
    ContagemPokemon += 52
    pokemonList.forEach(element => {
        minimo = parseInt(element.id)
    })



    getPokemons()


}


async function getPokemons() {

    for (let i = minimo; i <= ContagemPokemon; i++) {
  
        await fetch(PokeApi + i).then(data => data.json().then(resp => { pokemonList.push(resp) }))
  
    }
    console.log(pokemonList)

    pokemonCard()

}



function pokemonCard() {
    
    pokemonList.forEach(pokemon => {
        
      
        if (pokemon.id > minimo) {
           


            const pokeCArd = document.createElement('div');

            pokeCArd.classList.add("pokemonCard")

            pokeCArd.innerHTML = `

            <div onclick="detalhes(${pokemon.id})">
            
                <h4 class="id">N° ${idFormater(pokemon.id)}</h4>
                <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" class="pokeImage">
                
                <h3>${pokemon.name}</h3>
                
                <div id ="${pokemon.id}" class="status">    
                
                </div>
                    <div class ="detalhes a${pokemon.id}">
                    </div>
                </div>
                `
            document.getElementById("pokemonArea").appendChild(pokeCArd)
            typeVerifier(pokemon.types, pokemon.id)


        }

    })

}



function typeVerifier(tipos, id) {

    let types = Array()

    tipos.map(element => { types.push(element.type.name) })

    types.forEach(element => {

        const classes = document.createElement("span")
        const elemento = document.getElementById(id)

        classes.innerHTML = element
        classes.className = `${element} tipo`
        elemento.appendChild(classes)
    })



}

function idFormater(id) {

    let controle = parseInt(id)

    if (controle < 10) {

        controle = "00" + controle
    } else if (controle > 10 && controle < 99) {
        controle = "0" + controle
    } else {
        controle = controle
    }

    return controle

}



async function pesquisarPoke() {

    
    let pesquisa = document.getElementById("pesquisa").value
    pesquisa = pesquisa.toLowerCase()
    let resultado = Array()

    if (pesquisa != "") {

        $("#carregarMais").hide()
        document.getElementById("pokemonArea").innerHTML = ""
        await fetch(PokeApi + pesquisa).then(data => data.json().then(resp => { resultado.push(resp) })).catch(err => { console.log(err); $("#pokemonArea").html("<h1 class='erro'>Pokemon não encontrado</h1>") })


        resultado.forEach(pokemon => {

        

            const pokeCArd = document.createElement('div');

            pokeCArd.classList.add("pokemonCard")

            pokeCArd.innerHTML = `
            
            <div onclick="detalhes(${pokemon.id})">

            <h4 class="id">N° ${idFormater(pokemon.id)}</h4>
            <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" class="pokeImage">
            
            <h3>${pokemon.name}</h3>
            
            <div id ="${pokemon.id}" class="status">    
            
            </div>
            </div>
            `

            document.getElementById("pokemonArea").appendChild(pokeCArd)
            typeVerifier(pokemon.types, pokemon.id)



        })




    }


}






getPokemons()
