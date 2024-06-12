const scoreImage = document.getElementById("scoreImage");
const special = document.getElementById("special");

document.addEventListener('DOMContentLoaded', function() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const scorePart1 = urlParams.get('score');
    const scorePart2 = urlParams.get('array');
    const arrayPart2 = JSON.parse(decodeURIComponent(scorePart2)); // Convertir string a array

    // Mostrar el score
    const scoreDisplay = document.getElementById('scorePart1');
    scoreDisplay.innerHTML = `${parseInt(scorePart1*100/27)}%`;

    scorePart1==0?special.innerHTML = "No presentas síntomas de depresión":special.innerHTML = "";

    if(scorePart1 == 0){
        scoreImage.src = "img/feliz.png";
    } else if(scorePart1 > 0 && scorePart1 <= 4){
        scoreImage.src = "img/minimo.png";
    } else if(scorePart1 >= 5 && scorePart1 <= 9){
        scoreImage.src = "img/leve.png";
    } else if(scorePart1 >= 10 && scorePart1 <= 14){
        scoreImage.src = "img/moderado.png";
    } else if(scorePart1 >= 15 && scorePart1 <= 19){
        scoreImage.src = "img/moderadoGrave.png";
    } else if(scorePart1 >= 20){
        scoreImage.src = "img/grave.png";
    }

    console.log(arrayPart2);
});
