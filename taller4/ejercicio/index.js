import dataset from "./dataset.js"
import { calcularMediaAritmetica, random, createColorsRandom } from "./utils.js"
import { htmlLegendPlugin, externalTooltipHandler } from "./plugins-chart.js"
import { lastAvailableData, parseDataToPercentage } from "./app.js"

const API_URL = './residuesSpain.json'
const mainContainer = document.getElementById('container')

/*
   App
*/

const data = await dataset(API_URL)
const lastData = lastAvailableData(data)


/*
  Sección chart.js
*/

// Creando el canvas con los datos del dataset

const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: lastData.map(e => e[0]),
        datasets: [{
            label: 'Residuos (T)',
            data: parseDataToPercentage(lastData.map(element => element[1])).sort(),
            backgroundColor: createColorsRandom(lastData.length, 0.5),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                display: false,
            },
        },    
        plugins: {
            title: {
                display: true,
                text: 'Datos sobre residuos en España por sector industrial en Toneladas'
            },
            htmlLegend: {
                containerID: 'legend-container',
            },
            legend: {
                display: false,
                fullSize: false,
                position: 'right',
                maxWidth: 500,
                labels: {
                    pointStyle: 'circle',
                    usePointStyle: true
                }
            },
            tooltip: {
                enabled: false,
                external: externalTooltipHandler,
                callbacks: {
                    label: function(context) {

                        let label = context.dataset.label || ''

                        if (label) {
                            label += ': '
                        }
                        if (context.parsed !== null) {
                            label += `${context.label} (${Math.round(context.parsed*100)} %)`
                        }
                        return label
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true,
    },
    plugins: [
        htmlLegendPlugin
    ]
})
