let currentPageUrl = 'https://swapi.tech/api/people/'

window.onload = async() => {
    try {
      await  loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards!')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((item) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${item.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${item.name}`;
            
            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);
            
            card.onclick = async () => {
                const responseCard = await fetch(item.url);
                const responseCardJson = await responseCard.json();
                const characterProperties = responseCardJson.result.properties;
                
       
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";
    
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = ""; // Resetar o modal ao clickar em um novo
    
                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${item.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image";
    
                const modalName = document.createElement("span");
                modalName.className = "character-details";
                modalName.innerText = `Nome: ${characterProperties.name}`;
    
                const modalHeight = document.createElement("span");
                modalHeight.className = "character-details";
                modalHeight.innerText = `Altura: ${convertHeight(characterProperties.height)}m`;

                const modalBirthYear = document.createElement("span");
                modalBirthYear.className = "character-details";
                modalBirthYear.innerText = `Ano de nascimento: ${convertmodalBirthYear(characterProperties.birth_year)}`;

                const modalGender = document.createElement("span");
                modalGender.className = "character-details";
                modalGender.innerText = `Genero: ${convertGender(characterProperties.gender)}`;

                const modalMass = document.createElement("span");
                modalMass.className = "character-details";
                modalMass.innerText = `Peso: ${convertMass(characterProperties.mass)}`;

                const worldFetch = await fetch(characterProperties.homeworld);
                const worldFetchJson = await worldFetch.json();
                const homeWorldName = worldFetchJson.result.properties;
                const modalHomeWorld = document.createElement("span");
                modalHomeWorld.className = "character-details";
                modalHomeWorld.innerText = `Planeta: ${homeWorldName.name}`



                
                modalContent.appendChild(characterImage);   
                modalContent.appendChild(modalName);   
                modalContent.appendChild(modalHeight);   
                modalContent.appendChild(modalBirthYear);   
                modalContent.appendChild(modalGender);   
                modalContent.appendChild(modalMass);
                modalContent.appendChild(modalHomeWorld);   
            }              
            mainContent.appendChild(card);
        });
        
        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
    } catch {
        console.log(error)
        alert("Erro ao carregar a próxima página")
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
    } catch {
        console.log(error)
        alert("Erro ao carregar a página anterior")
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertHeight(modalHeight) {
    if (modalHeight === "unknown") {
        return "Desconhecida"
    } 
    
    return (modalHeight / 100).toFixed(2);
}

function convertMass(modalMass) {
    if (modalMass === "unknown") {
        return "Desconhecido"
    }

    return `${modalMass} KG`
}

function convertmodalBirthYear(modalBirthYear) {
    if (modalBirthYear === "unknown") {
        return "Desconhecido"
    }
    return modalBirthYear
}

function convertGender(modalGender) {
    if (modalGender === "male") {
        return "Homem"
    }
    
    if (modalGender === "female") {
        return "Mulher"
    }

    if (modalGender === "n/a") {
        return "Desconhecido"
    }

    return modalBirthYear
}