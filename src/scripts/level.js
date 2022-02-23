"use strict";
var words, answer, gameElems = {
    definitionBox: document.getElementById('definition-box'),
    pronounce: document.getElementById('pronounce'),
    partOfSpeech: document.getElementById('speech-part'),
    definition: document.getElementById('definition'),
    answer: document.getElementById('answerInput'),
    submit: document.getElementById('submit'),
    definitions: document.getElementById('definitions'),
};
getWords();
async function getWords() {
    words = await fetch('words.json').then(response => { return response.json(); });
    generateLevel();
}
function generateLevel() {
    var rand = Math.floor(Math.random() * words.words.length);
    gameElems.answer.innerHTML = '';
    gameElems.definitions.innerHTML = '';
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words.words[rand]}`)
        .then(response => { return response.json(); })
        .then(json => {
        answer = words.words[rand];
        if (json[0].phonetic == undefined) {
            gameElems.pronounce.innerText = json[0].phonetics[0].text;
        }
        else {
            gameElems.pronounce.innerText = json[0].phonetic;
        }
        for (var def of json[0].meanings) {
            var meaning = document.createElement('div');
            meaning.classList.add('meaning');
            meaning.innerHTML = `<strong>Definition: (${def.partOfSpeech})</strong>&nbsp;${def.definitions[0].definition}`;
            gameElems.definitions.appendChild(meaning);
        }
        createInput();
        startTimer();
    })
        .catch(err => {
        console.log(err);
        generateLevel();
    });
}
var allowedLetters = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
];
function createInput() {
    var answerLetters = answer.split('');
    var i = 0;
    for (var letter in answerLetters) {
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `input-${i.toString()}`);
        input.setAttribute('aria-label', `input letter ${i + 1} of your answer`);
        input.classList.add('letter');
        input.addEventListener('keydown', (event) => {
            event.preventDefault();
            var e = event;
            var id = parseInt(e.target.id.split('-')[1]);
            var key = e.key;
            var elem = document.getElementById(`input-${id}`);
            if (['Backspace', 'Delete'].includes(key)) {
                elem.setAttribute('value', '');
                document.getElementById(`input-${id - 1}`).focus();
            }
            else if (allowedLetters.includes(key)) {
                elem.setAttribute('value', key);
                if (id == answerLetters.length - 1) {
                    gameElems.submit.focus();
                }
                else {
                    document.getElementById(`input-${id + 1}`).focus();
                }
            }
        });
        gameElems.answer.appendChild(input);
        i += 1;
    }
    document.getElementById('input-0').focus();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9iaW4vbGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksS0FBVSxFQUNWLE1BQWMsRUFDZCxTQUFTLEdBQWM7SUFDbkIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUU7SUFDekQsU0FBUyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFFO0lBQ2hELFlBQVksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBRTtJQUNyRCxVQUFVLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUU7SUFDbEQsTUFBTSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFFO0lBQy9DLE1BQU0sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBRTtJQUMxQyxXQUFXLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUU7Q0FDdkQsQ0FBQztBQUVOLFFBQVEsRUFBRSxDQUFDO0FBRVgsS0FBSyxVQUFVLFFBQVE7SUFDbkIsS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7SUFDN0UsYUFBYSxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUMvQixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFFcEMsS0FBSyxDQUFDLG1E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