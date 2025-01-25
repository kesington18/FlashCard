let createBox = document.querySelector(".card-criteria");
let flashCard = document.querySelector(".flashcard");
let flashCards = document.querySelector(".flashcards");
let question = document.querySelector("#question");
let answer = document.querySelector("#answer");
const error = document.querySelector(".error");

window.onload = showData();

function validateForm() {
    if (!question.value.trim()) {
        error.innerHTML = "Please write your question";
        error.style.display = "block";
        // alert('input question');
        return false;
    }

    if (!answer.value.trim()) {
        error.innerHTML = "Please write your answer(s)";
        error.style.display = "block";
        // alert('input question');
        return false;
    }

    return true;
}
function showCreateCard() {
    createBox.style.display = "flex";
}

function hideCreateCard() {
    createBox.style.display = "none";
}

function deleteFlashCard(index) {
    var object;
    if (localStorage.getItem('object') == null) {
        object = [];
    } else {
        object = JSON.parse(localStorage.getItem('object'));
    }

    object.splice(index, 1);
    localStorage.setItem('object', JSON.stringify(object));
    showData();
}


function addFlashCard() {
    if (validateForm() == true) {
        error.style.display = 'none';
        var object;
        if (localStorage.getItem('object') == null) {
            object = [];
        } else {
            object = JSON.parse(localStorage.getItem('object'));
        }

        object.push({
            question: question.value,
            answer: answer.value
        });

        localStorage.setItem('object', JSON.stringify(object));
        showData();
        question.value = "";
        answer.value = "";
        // displayAnswer();
    }
/*     h2_answer.style.cursor = "pointer";
    h2_answer.style.display = "none"; */
    /* var h2 = document.createElement("h2");
    var  */
}



function showData() {
    var object;
    if (localStorage.getItem('object') == null){
        object = [];
    } else {
        object = JSON.parse(localStorage.getItem('object'));
    }

    var html = "";
    object.forEach((element, index) => {
        html += `<div class="flashcard"     onclick="displayAnswer(this)">
            <div>
                <h2 class="question">${element.question}</h2>
                <h2 class="answer">${element.answer}</h2>
            </div>
            <div class="actions">
                <button onclick="updateFlashcard(${index})">edit</button>
                <button onclick="deleteFlashCard(${index})">delete</button>
            </div>
        </div>`
    });

    flashCards.innerHTML = html;
}

function displayAnswer(flashcard) {
    const answerDisplay = flashcard.querySelector('.answer');
    if (answerDisplay.style.display === "none" || !answerDisplay.style.display) {
        answerDisplay.style.display = " block";
    } else {
        answerDisplay.style.display = "none";
    }
}

function updateFlashcard(index) {
    document.getElementById('save').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    var object;
    if (localStorage.getItem('object') == null) {
        object = [];
    } else {
        object = JSON.parse(localStorage.getItem('object'));
    }

    question.value = object[index].question;
    answer.value = object[index].answer;

    document.getElementById('update').onclick = () => {
        if (validateForm() === true) {
            object[index].question = question.value;
            object[index].answer = answer.value;

            localStorage.setItem('object', JSON.stringify(object));

            showData();

            question.value = '';
            answer.value = '';

            document.getElementById('save').style.display = 'block';
            document.getElementById('update').style.display = 'none';
        }
    } 
}