let currentPageUrl = 'https://swapi.tech/api/vehicles/'

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
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/vehicles/${item.url.replace(/\D/g, "")}.jpg')`
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
    
                const vehicleImage = document.createElement("div");
                vehicleImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/vehicles/${item.url.replace(/\D/g, "")}.jpg')`
                vehicleImage.className = "character-image";
    
                const modalName = document.createElement("span");
                modalName.className = "character-details";
                modalName.innerText = `Nome: ${characterProperties.name}`;
    
                const modalModel = document.createElement("span");
                modalModel.className = "character-details";
                modalModel.innerText = `Modelo: ${characterProperties.model}`;

                const modalManufacturer = document.createElement("span");
                modalManufacturer.className = "character-details";
                modalManufacturer.innerText = `Fabricante: ${characterProperties.manufacturer}`;

                const modalClass = document.createElement("span");
                modalClass.className = "character-details";
                modalClass.innerText = `Classe: ${characterProperties.vehicle_class}`;

                const modalSpeed = document.createElement("span");
                modalSpeed.className = "character-details";
                modalSpeed.innerText = `Velocidade Máxima: ${characterProperties.max_atmosphering_speed} Km/h`;

                const modalLength = document.createElement("span");
                modalLength.className = "character-details";
                modalLength.innerText = `Comprimento : ${characterProperties.length}m`







                
                modalContent.appendChild(vehicleImage);   
                modalContent.appendChild(modalName);   
                modalContent.appendChild(modalModel);   
                modalContent.appendChild(modalManufacturer);   
                modalContent.appendChild(modalClass);   
                modalContent.appendChild(modalSpeed);   
                modalContent.appendChild(modalLength);   
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
