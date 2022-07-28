const pokeName =  document.querySelector('.pokeName')
const pokeNumber =  document.querySelector('.pokeNumber')
const pokeImage =  document.querySelector('.pokeImage')
const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')
const btPrev = document.querySelector('.btnPrev')
const btNext = document.querySelector('.btnNext')

var url = window.location.href;
var res = url.split('?')
var parametro = res[1].split('&');
let searchPokemon = parametro
const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(apiResponse.status==200){
        const data = await apiResponse.json()
        return data
    }
}
const renderPokemon = async (pokemon) =>{
    pokeName.innerHTML = 'Loading...'
    pokeNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    if(data){
    searchPokemon = data.id
    pokeImage.style.display = 'block'
    pokeName.innerHTML = data.name
    pokeNumber.innerHTML = data.id
    pokeImage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }else{
        pokeName.innerHTML = 'Not Found'
        pokeNumber.innerHTML = ''
        pokeImage.style.display = 'none'
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    input.value = ''
})
btPrev.addEventListener('click', () =>{
    if(searchPokemon >1){
    searchPokemon -=1
    renderPokemon(searchPokemon)
    input.value = ''
}
})
btNext.addEventListener('click', () =>{
    searchPokemon +=1
    renderPokemon(searchPokemon)
    input.value = ''
})
renderPokemon(searchPokemon)