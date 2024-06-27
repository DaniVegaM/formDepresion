const scoreImage = document.getElementById("scoreImage");
const special = document.getElementById("special");
const estadoDepre = document.getElementById("estadoDepre");

document.addEventListener('DOMContentLoaded', function() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const scorePart1 = urlParams.get('score');
    const scorePart2 = urlParams.get('array');
    const arrayPart2 = JSON.parse(decodeURIComponent(scorePart2)); // Convertir string a array

    // Mostrar el score
    const scoreDisplay = document.getElementById('scorePart1');
    scoreDisplay.innerHTML = `${parseInt(scorePart1 * 100 / 27)}%`;

    scorePart1 == 0 ? special.innerHTML = "No presentas síntomas de depresión" : special.innerHTML = "";

    if (scorePart1 == 0) {
        scoreImage.src = "img/feliz.png";
        estadoDepre.innerHTML = "Sin depresión";
    } else if (scorePart1 > 0 && scorePart1 <= 4) {
        scoreImage.src = "img/minimo.png";
        estadoDepre.innerHTML = "Mínimo";
    } else if (scorePart1 >= 5 && scorePart1 <= 9) {
        scoreImage.src = "img/leve.png";
        estadoDepre.innerHTML = "Leve";
    } else if (scorePart1 >= 10 && scorePart1 <= 14) {
        scoreImage.src = "img/moderado.png";
        estadoDepre.innerHTML = "Moderado";
    } else if (scorePart1 >= 15 && scorePart1 <= 19) {
        scoreImage.src = "img/moderadoGrave.png";
        estadoDepre.innerHTML = "Moderado a grave";
    } else if (scorePart1 >= 20) {
        scoreImage.src = "img/grave.png";
        estadoDepre.innerHTML = "Grave";
    }

    console.log(arrayPart2);

    let numInternos = 0;
    let numExternos = 0;
    let numGraves = 0;

    for (let i = 0; i < arrayPart2.length; i++) {
        if (i <= 3 && arrayPart2[i] == 1) {
            numInternos++;
        } else if (i > 3 && i <= 8 && arrayPart2[i] == 1) {
            numExternos++;
        } else if (i > 8 && arrayPart2[i] == 1) {
            numGraves++;
        }
    }

    // Mostrar gráfico
    updatePieChart(numInternos, numExternos, numGraves);
});

const ctx = document.getElementById('myPieChart').getContext('2d');
let myPieChart;

function updatePieChart(param1, param2, param3) {
    const data = [param1, param2, param3];
    const labels = ['Internos', 'Externos', 'Graves'];

    // Destruir el gráfico existente si ya existe
    if (myPieChart && typeof myPieChart.destroy === 'function') {
        myPieChart.destroy();
    }

    // Crear la nueva gráfica de pastel
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#ffd500', '#d8315b', '#aeb8fe'],
                hoverBackgroundColor: ['#ffd500', '#d8315b', '#aeb8fe']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: '#111111',
                    formatter: (value, context) => {
                        let total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        let percentage = ((value / total) * 100).toFixed(2) + '%';
                        return context.chart.data.labels[context.dataIndex] + '\n' + percentage;
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            let value = context.raw;
                            let percentage = ((value / total) * 100).toFixed(2) + '%';
                            return context.label + ': ' + value + ' (' + percentage + ')';
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
