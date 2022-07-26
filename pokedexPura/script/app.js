const getPokemonUrl = id => 'https://pokeapi.co/api/v2/pokemon/' + id

const generatePokemonPromises = () => Array(898).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
        const icon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        accumulator += '<a href="card.html?'+pokemon.id+'"><li class="card ' + types[0] + '">' + '<img class= "card-image"' + 'alt = "' + pokemon.name + '" src = "' + icon + '"' + '/>' + '<h2>' + pokemon.id + '. ' + pokemon.name + '</h2>' + '<p class="card-subtitle">' + types.join(' | ') + '</p>' + '</li></a>'
        return accumulator
    }, '')
}
const insertInPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
const pokemonPromises = generatePokemonPromises()
Promise.all(pokemonPromises)
    .then(generateHTML).then(insertInPage)
