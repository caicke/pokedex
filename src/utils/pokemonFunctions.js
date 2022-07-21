module.exports = {

    //retorna uma lista com os nomes de todos os pokemons
    getPokemonNames: function(pokemonList) {
        var pokemonNames = []
    
        pokemonList.map( element => {
            pokemonNames.push(element.name)
        })
    
        return pokemonNames;
    },

    // retorna as informações do pokemon com o nome passado como parametro
    getPokemonByName: function(pokemonList, name) {
        return pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase())
    },

    // retorna a lista com as fraquezas do pokemon passado como parametro
    getPokemonWeaknessesByName: function(pokemonList, typeList) {
        const pokemons = []
    
        pokemonList.map(ele => {
            if (typeList.some(r => ele.weaknesses.indexOf(r) >= 0)) {
                pokemons.push(ele);
            }
        });
    
        return pokemons;
    },
    
    // retorna a lista do tipo do pokemon passado como parametro
    getPokemonTypeList: function(pokemonList, name) {
        var types = [];
        const pokemon = pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase());
        
        if (pokemon) {
            types = pokemon.type;
        }
    
        return types;
    },

    // procura na lista de pokemons, aqueles que contém um dos tipos da lista em sua relação de fraquezas
    getPokemonAdvantagesByType: function(pokemonList, typeList) {
        const pokemons = []

        pokemonList.map(ele => {
            if (!typeList.some(r => ele.weaknesses.indexOf(r) >= 0)) {
                pokemons.push(ele);
            }
        });

        return pokemons;
    },

    // retorna a lista de tipos do pokemon
    getPokemonTypes: function(pokemon) {
        return pokemon.type;
    }

}


