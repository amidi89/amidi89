const input = document.querySelector(".input");  
const addButton = document.querySelector(".addButton");  
const card1 = document.querySelector(".card1"); 
const card2 = document.querySelector(".card2");  
const deleteAllButton = document.querySelector(".deleteAll");  


const translitMap = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '',
    'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya', 'а': 'a', 'б': 'b',
    'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh',
    'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya'
};


function transliterate(word) {
    return word.split('').map(char => translitMap[char] || char).join('');

}


function addNewWord() {
    const word = input.value.trim();  
    if (!word) return;  


    const allWords = document.querySelectorAll('.russianWord');
    const newIndex = allWords.length + 1;


    const russianRowDiv = document.createElement('div');
    russianRowDiv.className = 'russianRow';

    const indexDiv = document.createElement('div');
    indexDiv.className = 'indexRow';
    indexDiv.innerText = newIndex; 

    const russianWordDiv = document.createElement('div');
    russianWordDiv.className = "russianWord";
    russianWordDiv.innerText = word.length > 8 ? word.slice(0, 8) + '...' : word;
    russianWordDiv.title = word;  
    russianWordDiv.setAttribute('data-index', newIndex);


    russianRowDiv.appendChild(indexDiv);
    russianRowDiv.appendChild(russianWordDiv);


    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const translitWordDiv = document.createElement('div');
    translitWordDiv.className = "translitWord";
    translitWordDiv.innerText = transliterate(word);
    translitWordDiv.setAttribute('data-index', newIndex);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'css/assets/delete-icon.png';
    deleteIcon.className = 'deleteIcon';
    deleteIcon.onclick = () => removeWord(newIndex);  


    rowDiv.appendChild(translitWordDiv);
    rowDiv.appendChild(deleteIcon);


    card1.appendChild(russianRowDiv);
    card2.appendChild(rowDiv);

    input.value = "";  
}


function removeWord(index) {

    if (index === 1) return;

    const russianRowToDelete = document.querySelector(`.russianWord[data-index="${index}"]`).parentElement;
    const translitRowToDelete = document.querySelector(`.translitWord[data-index="${index}"]`).parentElement;

    if (russianRowToDelete && translitRowToDelete) {
        russianRowToDelete.remove();
        translitRowToDelete.remove();
        updateIndexes();  
    }
}


function updateIndexes() {
    const allWords = document.querySelectorAll('.russianRow');
    allWords.forEach((wordDiv, i) => {
        const newIndex = i + 1;  
        wordDiv.querySelector('.indexRow').innerText = newIndex;  
        const russianWord = wordDiv.querySelector('.russianWord');
        russianWord.setAttribute('data-index', newIndex);

        const translitWord = card2.querySelector(`.translitWord[data-index="${newIndex}"]`);
        if (translitWord) {
            translitWord.setAttribute('data-index', newIndex);  
        }
    });
}


function clearAllWords() {
    const allRussianRows = document.querySelectorAll('.russianRow');
    const allTranslitRows = document.querySelectorAll('.card2 .row');
    
    allRussianRows.forEach((row, index) => {
        if (index !== 0) row.remove();  
    });

    allTranslitRows.forEach((row, index) => {
        if (index !== 0) row.remove();  
    });
}

addButton.addEventListener("click", addNewWord);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addNewWord();
    }
});

deleteAllButton.addEventListener("click", clearAllWords);
