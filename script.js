const baseUrl = "https://pokeapi.co/api/v2/";
const pokemonUrl = baseUrl + "pokemon/";
const pokemonContainer = document.getElementById("pokemon-container");
const searchInput = document.getElementById("search-input");
const limit = 100000000;

function searchPokemon(query) {
  fetch(`${pokemonUrl}?limit=${limit}`)
    .then(response => response.json())
    .then(pokemonList => {
      const filteredResults = pokemonList.results.filter(pokemon => pokemon.name.includes(query.toLowerCase()));

      pokemonContainer.innerHTML = "";

      filteredResults.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonDetails => {
            const capitalizedPokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`;

            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
              <h2>${capitalizedPokemonName}</h2>
              <p>#${formatPokedexNumber(pokemonDetails.id)}</p>
              <img src="${imageUrl}" alt="${capitalizedPokemonName}" />
              <h4>Altura: ${formatHeight(pokemonDetails.height)}</h4>
              <h4>Peso: ${formatWeight(pokemonDetails.weight)}</h4>
              <button class="more-info-button">Más Información</button>
            `;
            pokemonContainer.appendChild(pokemonCard);

            const moreInfoButton = pokemonCard.querySelector(".more-info-button");
            moreInfoButton.addEventListener("click", () => {
              showMoreInfo(pokemonDetails, pokemonCard, moreInfoButton);
            });
          })
          .catch(error => {
            console.error("Error al obtener detalles del Pokémon:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error al obtener la lista de Pokémon:", error);
    });
}

function showMoreInfo(pokemonDetails, pokemonCard, moreInfoButton) {
  const moreInfoDiv = document.createElement("div");
  moreInfoDiv.classList.add("more-info");

  moreInfoDiv.innerHTML = `
    <h4>Stats:</h4>
    <ul>
      ${pokemonDetails.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
    </ul>
    <h4>Experiencia base: ${pokemonDetails.base_experience}</h4>
    <h4>Habilidades ocultas:</h4>
    <ul>
      ${pokemonDetails.abilities.filter(ability => ability.is_hidden).map(hiddenAbility => `<li>${hiddenAbility.ability.name}</li>`).join("")}
    </ul>
    <h4>Todas las Habilidades:</h4>
    <ul>
      ${pokemonDetails.abilities.map(ability => `<li>${ability.ability.name}</li>`).join("")}
    </ul>
  `;

  pokemonCard.appendChild(moreInfoDiv);
  moreInfoButton.style.display = "none";
}

function formatPokedexNumber(number) {
  return number.toString().padStart(3, "0");
}

function formatHeight(height) {
  const meters = height / 10;
  return `${meters} m`;
}

function formatWeight(weight) {
  const kg = weight / 10;
  return `${kg} kg`;
}

searchInput.addEventListener("input", event => {
  const query = event.target.value;
  searchPokemon(query);
});

function showAllPokemon() {
  fetch(`${pokemonUrl}?limit=${limit}`)
    .then(response => response.json())
    .then(pokemonList => {
      pokemonList.results.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonDetails => {
            const capitalizedPokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`;

            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
              <h2>${capitalizedPokemonName}</h2>
              <p>#${formatPokedexNumber(pokemonDetails.id)}</p>
              <img src="${imageUrl}" alt="${capitalizedPokemonName}" />
              <h4>Altura: ${formatHeight(pokemonDetails.height)}</h4>
              <h4>Peso: ${formatWeight(pokemonDetails.weight)}</h4>
              <button class="more-info-button">Más Información</button>
            `;
            pokemonContainer.appendChild(pokemonCard);

            const moreInfoButton = pokemonCard.querySelector(".more-info-button");
            moreInfoButton.addEventListener("click", () => {
              showMoreInfo(pokemonDetails, pokemonCard, moreInfoButton);
            });
          })
          .catch(error => {
            console.error("Error al obtener detalles del Pokémon:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error al obtener la lista de Pokémon:", error);
    });
}

function searchPokemonByType(type) {
  fetch(`${baseUrl}type/${type}`)
    .then(response => response.json())
    .then(typeDetails => {
      const typePokemonUrls = typeDetails.pokemon.map(pokemon => pokemon.pokemon.url);
      pokemonContainer.innerHTML = "";

      typePokemonUrls.forEach(pokemonUrl => {
        fetch(pokemonUrl)
          .then(response => response.json())
          .then(pokemonDetails => {
            const capitalizedPokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`;

            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
              <h2>${capitalizedPokemonName}</h2>
              <p>#${formatPokedexNumber(pokemonDetails.id)}</p>
              <img src="${imageUrl}" alt="${capitalizedPokemonName}" />
              <h4>Altura: ${formatHeight(pokemonDetails.height)}</h4>
              <h4>Peso: ${formatWeight(pokemonDetails.weight)}</h4>
              <button class="more-info-button">Más Información</button>
            `;
            pokemonContainer.appendChild(pokemonCard);

            const moreInfoButton = pokemonCard.querySelector(".more-info-button");
            moreInfoButton.addEventListener("click", () => {
              showMoreInfo(pokemonDetails, pokemonCard, moreInfoButton);
            });
          })
          .catch(error => {
            console.error("Error al obtener detalles del Pokémon:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error al obtener los detalles del tipo de Pokémon:", error);
    });
}

const navbarLinks = document.querySelectorAll(".navbar-link");
navbarLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const type = link.getAttribute("data-type");
    handleNavbarSelection(type);
  });
});

function handleNavbarSelection(type) {
  if (type === "all") {
    showAllPokemon();
  } else {
    searchPokemonByType(type);
  }
}

showAllPokemon();
