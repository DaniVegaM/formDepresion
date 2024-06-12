let scorePart1 = 0;
let arrayResultados = [];

document.addEventListener('DOMContentLoaded', function() {
    const groupNames = [
        'group1', 'group2', 'group3', 'group4', 'group5', 'group6', 'group7', 'group8', 'group9', 'group10',
        'group11', 'group12', 'group13', 'group14', 'group15', 'group16', 'group17', 'group18', 'group19'
    ];

    const groupNamesPart1 = ['group1', 'group2', 'group3', 'group4', 'group5', 'group6', 'group7', 'group8', 'group9']; 
    const groupNamesPart2 = ['group10', 'group11', 'group12', 'group13', 'group14', 'group15', 'group16', 'group17', 'group18', 'group19'];


    groupNames.forEach(groupname => {
        justOneCheck(groupname);
    });
    groupNamesPart1.forEach(groupname =>{
        checkScorePart1(groupname);
    })
    groupNamesPart2.forEach(groupname =>{
        checkScorePart2(groupname);
    })

    const form = document.getElementById('myForm');
    const answers = document.getElementById('answers');
    const validacion = document.querySelector('.validacion');
    // const enviarButton = document.getElementById('enviarButton');

    //Validar antes de enviar
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let allGroupsValid = true;
        let contador = 1;

        answers.innerHTML = '';

        groupNames.forEach(groupname => {
            if (!isGroupChecked(groupname)) {
                allGroupsValid = false;
                if(contador < 10)
                    answers.innerHTML += `<p class="validacion__p">Pregunta ${groupname.charAt(groupname.length - 1)} </p>`;
                else
                    answers.innerHTML += `<p class="validacion__p">Pregunta ${groupname.charAt(groupname.length - 2)}${groupname.charAt(groupname.length - 1)} </p>`;
            }
            contador ++;
        });

        //Si algún grupo no es válido, prevenir el envío del formulario
        if (!allGroupsValid) {
            event.preventDefault();
            validacion.classList.remove("invisible");
        } else{
            validacion.classList.add("invisible");
            // let scoreTotal = scorePart1 + scorePart2;

            let resultadosParte2 = JSON.stringify(arrayResultados); // Convertir array a string
            console.log(arrayResultados);
            // alert(`El score total de ambas partes es: ${scorePart1} + ${scorePart2} = ${scoreTotal}`);

            // Pasar resultados a pantalla de score
            setTimeout(() => {
                window.location.href = `../score.html?score=${scorePart1}&array=${encodeURIComponent(resultadosParte2)}`;
            }, 1000);
        }
    });
});

//Asegurar que solo un checkbox de un grupo pueda estar marcado
const justOneCheck = function(groupname) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupname}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // totalScore += parseInt(this.value, 10);
                checkboxes.forEach(box => {
                    if (box !== this) {
                        box.checked = false;
                    }
                });
            } else{
                // totalScore -= parseInt(this.value, 10);
            }
        });
    });
}

const checkScorePart1 = function(groupname) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupname}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                scorePart1 += parseInt(this.value, 10);
            } else{
                scorePart1 -= parseInt(this.value, 10);
            }
        });
    });
}

const checkScorePart2 = function(groupname) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupname}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                arrayResultados.splice(parseInt(((this.getAttribute('name')).match(/\d+/))[0], 10), 1, parseInt(this.value, 10));
                    // scorePart2 += parseInt(this.value, 10);
            } else{
                arrayResultados.splice(parseInt(((this.getAttribute('name')).match(/\d+/))[0], 10), 1, 0);
            }
        });
    });
}

//Al menos un checkbox de un grupo está marcado
const isGroupChecked = function(groupname) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupname}"]`);
    return Array.from(checkboxes).some(checkbox => checkbox.checked);
}