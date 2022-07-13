let PokeApi = `https://pokeapi.co/api/v2/pokemon/`


let pokemonList = new Array()


async function getPokemons() {

    document.getElementById("pokemonArea").innerHTML = ""
    for (let i = 1; i <= 52; i++) {
        await fetch(PokeApi + i).then(data => data.json().then(resp => { pokemonList.push(resp) }))
    }

    pokemonCard()

}


function pokemonCard() {

    pokemonList.forEach(pokemon => {

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

    const pesquisa = document.getElementById("pesquisa").value
    let resultado = Array()

    if (pesquisa != "") {


        await fetch(PokeApi + pesquisa).then(data => data.json().then(resp => { resultado.push(resp) })).catch(err => { console.log("pokemon não encontrado", err) })

        document.getElementById("pokemonArea").innerHTML = ""

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
async function detalhes(id) {
    let detalhes = await fetch(PokeApi + id).then(data => data.json().then(resp => { return resp })).catch(err => { console.log("pokemon não encontrado", err) })
    console.log(detalhes)
}


getPokemons()
