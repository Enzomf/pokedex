let PokeApi = `https://pokeapi.co/api/v2/pokemon/`


let pokemonList = new Array()


async function getPokemons(){

    document.getElementById("pokemonArea").innerHTML=""
    for(let i= 1; i<= 50; i++){
        await fetch(PokeApi + i).then(data =>data.json().then(resp=>{pokemonList.push(resp)}))     
    }
    
    pokemonCard()
    console.log("ca")
}


function pokemonCard(){

    pokemonList.forEach(pokemon=>{
        
       const pokeCArd = document.createElement('div');

       pokeCArd.classList.add("pokemonCard")

       pokeCArd.innerHTML = `
    
                    <h3>${pokemon.name}</h3>
                    <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" class="pokeImage">
                    <div class="status">
                        <h4 class="id">${pokemon.id}</h4>
                        <span class="grass">${pokemon.type}</span>
                        <span class="poison">poison</span>
                    </div>
       
        `
        document.getElementById("pokemonArea").appendChild(pokeCArd)

    })

}



async function pesquisarPoke(){
    
    const pesquisa =  document.getElementById("pesquisa").value
    let resultado =Array()
    
    if(pesquisa !=""){
        
        
        await fetch(PokeApi + pesquisa).then(data =>data.json().then(resp=>{resultado.push(resp)})) .catch(err =>{console.log("pokemon não encontrado", err)})    
        
        document.getElementById("pokemonArea").innerHTML = ""
        
        resultado.forEach(pokemon=>{
            
            const pokeCArd = document.createElement('div');
            
            pokeCArd.classList.add("pokemonCard")
            
            pokeCArd.innerHTML = `
            
            <h3>${pokemon.name}</h3>
            <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" class="pokeImage">
            <div class="status">
            <h4 class="id">${pokemon.id}</h4>
            <span class="grass">${pokemon.type}</span>
            <span class="poison">poison</span>
            </div>
            
            `
            document.getElementById("pokemonArea").appendChild(pokeCArd)
     
        })
        
        
        
    }else{
        
        getPokemons()
    }
    
    
}


getPokemons()