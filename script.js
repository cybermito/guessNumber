/* 
    Adivina el número: Pasos.

    1.- Generar un número aleatorio entre 1 y 100
    2.- Registrar el número del intento en el que el jugador se encuentre.
    3.- Darle al jugador una forma de adivinar cuál es el número.
    4.- Una vez que se ha introducido el número, registrarlo en alguna parte
    para que el jugador pueda ver sus intentos previos
    5.- A continuación, comprobar si el número es correcto
    6.- Si es correcto:
        i. Mostrar un mensaje de felicitación.
        ii. Hacer que el jugador no pueda introducir más intentos.
        iii. Mostrar un control que permita el jugador volver a empezar el juego.

    7.- Si es incorrecto y al jugador le quedan intentos:
        i. Decirle al jugador que ha fallado
        ii. Dejar que el jugador lo intente de nuevo.
        iii. Incrementar el número de intentos en 1

    8.- Si el jugador falla y no le quedan intentos:
        i. Decirle al jugador que el juego ha terminado
        ii. Hacer que el jugador no pueda introducir más intentos
        iii. Mostrar un control que permita al jugador volver a empezar el juego.

    9.- Una vez que el juego se reinicia, asegurarse de que la lógica del juego
    y la IU (Interfaz de usuario) se restablezcan  por completo, luego vuelve
    al paso 1.
    

*/

/* Generamos el número aleatorio */
let randomNumber = Math.floor(Math.random()*100) + 1;

/* Traemos del dom los elementos necesarios */
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

/* Variable contador de intentos y para el botón de reinicio */
let guessCount = 1;
let resetButton;

/* Función para comprobar si hemos adivinado o no el número */

function checkGuess() {

    const userGuess = Number(guessField.value);

    if(guessCount === 1) {
        guesses.textContent = "Intentos anteriores: ";
    }
    guesses.textContent += userGuess + " ";

    if(userGuess === randomNumber){
        lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();

    } else if(guessCount === 10) {
        lastResult.textContent = "¡¡GAME OVER!!";
        setGameOver();

    } else {
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";
        /*Comprobamos si número mayor o menor */
        if(userGuess < randomNumber){
            lowOrHi.textContent = "¡El número es muy bajo!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "¡El número es muy alto!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Comenzar de nuevo";
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame(){

    guessCount = 1;
    
    const resetParas = document.querySelectorAll(".resultParas p");

    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    
    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

