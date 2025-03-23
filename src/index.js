#!/home/wayne/Downloads/node-v20.18.3-linux-x64/bin/node
let characterVotes = {};
let currentCharacter = null;
document.addEventListener("DOMContentLoaded", () => {
    const submitter = document.getElementById("Add-Votes");
    if (submitter) {
        submitter.addEventListener("click", (event) => {
            event.preventDefault();
            if (currentCharacter) {
                addTheVotes(currentCharacter);
            } else {
                alert("Please select a character first!");
            }
        });
    }
    const resetButton = document.getElementById("reset-btn");
    if (resetButton) {
        resetButton.addEventListener("click", (event) => {
            event.preventDefault();
            reset();
        });
    }
});
function displayImage(character) {
    if (!(character.name in characterVotes)) {
        characterVotes[character.name] = 0;
    }
    const image = document.getElementById("image");
    image.src = character.image;
    image.alt = character.name;
    const voteCounter = document.getElementById("vote-count");
    voteCounter.textContent = characterVotes[character.name];
    currentCharacter = character.name;
}
function addTheVotes(characterName) {
    const addedVotes = parseInt(document.getElementById("votes").value) || 0;
    characterVotes[characterName] += addedVotes;
    const voteCounter = document.getElementById("vote-count");
    voteCounter.textContent = characterVotes[characterName];
}
function displayData(characters) {
    if (!Array.isArray(characters)) {
        console.error("Error: characters is not an array", characters);
        return;
    }
    const menuBar = document.getElementById('character-bar');
    menuBar.innerHTML = '';
    characters.forEach(character => {
        characterVotes[character.name] = 0;
        const div = document.createElement('div');
        const snap = document.createElement('span');
        snap.textContent = character.name;
        snap.style.cursor = 'pointer';
        snap.addEventListener('click', () => {
            displayImage(character);
        });
        div.appendChild(snap);
        menuBar.appendChild(div);
    });
}
function fetchData() {
    return fetch('https://rickandmortyapi.com/api/character')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data.results)
        .catch(error => {
            console.error("Fetch error:", error);
        });
}
function reset() {
    for (let character in characterVotes) {
        characterVotes[character] = 0;
    }
    location.reload();
}
fetchData().then(data => {
    displayData(data);
});
