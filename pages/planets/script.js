let currentPageUrl = 'https://swapi.tech/api/planets/'

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
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${item.url.replace(/\D/g, "")}.jpg')`
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
    
                const planetImage = document.createElement("div");
                planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${item.url.replace(/\D/g, "")}.jpg')`
                planetImage.className = "character-image";
    
                const modalName = document.createElement("span");
                modalName.className = "character-details";
                modalName.innerText = `Nome: ${characterProperties.name}`;
    
                const modalDiameter = document.createElement("span");
                modalDiameter.className = "character-details";
                modalDiameter.innerText = `Diâmetro: ${characterProperties.diameter} km`;

                const modalPopulation = document.createElement("span");
                modalPopulation.className = "character-details";
                modalPopulation.innerText = `População: ${convertmodalPopulation(characterProperties.population)}`;

                const modalClimate = document.createElement("span");
                modalClimate.className = "character-details";
                modalClimate.innerText = `Clima: ${characterProperties.climate}`;

                const modalRotationPeriod = document.createElement("span");
                modalRotationPeriod.className = "character-details";
                modalRotationPeriod.innerText = `Período de rotação: ${characterProperties.rotation_period} dias`;

                
                const modalOrbitalPeriod = document.createElement("span");
                modalOrbitalPeriod.className = "character-details";
                modalOrbitalPeriod.innerText = `Período Orbital: ${characterProperties.orbital_period} dias`


                
                modalContent.appendChild(planetImage);   
                modalContent.appendChild(modalName);
                modalContent.appendChild(modalDiameter);   
                modalContent.appendChild(modalPopulation);   
                modalContent.appendChild(modalRotationPeriod);   
                modalContent.appendChild(modalOrbitalPeriod);   
       
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

function convertmodalPopulation(modalPopulation) {
    if (modalPopulation === "unknown") {
        return "Desconhecido"
    }
    return parseInt(modalPopulation).toLocaleString('pt-BR');
}