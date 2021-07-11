import dataset from "./dataset.js"
import { calcularMediaAritmetica, random } from "./utils.js"

const API_URL = './residuesSpain.json'
const mainContainer = document.getElementById('container')

function filterDataSet(dataset) {
    // Filtrar todos los resultados para solo tener un array de los totales
    const dataFiltered = dataset.filter(element => element.MetaData[0].Codigo === 'totalgeneral' && element.MetaData[1].Codigo !== 'totalgeneracion')

    return dataFiltered
}

function cleanDataset(dataset) {
    // Esta función devuelve todos los períodos con datos disponible

    // Filtrando los datos para obtener los totales
    const dataFiltered = filterDataSet(dataset)

    // Solo nos interesa un array con el nombre de la indsutria y el dato (cantidad de residuos)
    const dataCleaned = dataFiltered.map(element => {
        return [
            element.MetaData[1].Nombre, 
            element.Data
        ]
            
    })

    return dataCleaned
}

function lastAvailableData(dataset) {
    // Esta función devuelve el último período con dato disponible

    // Filtrando los datos para obtener los totales
    const dataFiltered = filterDataSet(dataset)

    // Filtrando los resultados para generar un array con el nombre de los sectores industriales en la primera posición y el valor en toneladas en la segunda posición
    const lastData = dataFiltered.map(element => {
        return [
            element.MetaData[1].Nombre,
            element.Data[0].Valor
        ]
    })

    // Devuelve Array con nombre del sector industrial en posición 0 y la cantidad de residuos en la posición 1

    return lastData

} 


function createColorsRandom(len, opacity) {

    // Iniciamos un array vacío de colores
    let colors = []

    // Validamos que la propiedad opacity sea un número entre 0 y 1
    if (typeof(opacity) === 'number' && opacity <=1 && opacity >= 0) {

        // Usamos un bucle for para crear tantos colores como datos tengamos en el dataset
        for (let i = 0; i < len; i++) {

            // Iniciamos la variable con un color que será random y con opacidad
            let color = `rgba(${random(255)},${random(255)},${random(255)}, ${opacity})`


            // Añadimos el color al array de colors
            colors.push(color)
        }

    }

    return colors
}

function parseDataToPercentage(data) {

    // Sumar todos los datos con reduce
    const total = data.reduce((acc, cv) => acc + cv)

    // Pasando a porcentaje los datos del dataset enviado
    const dataWithPercentage = data.map(data => {
        const result = (data/total)
        return result.toFixed(2)
    })


    return dataWithPercentage
}

const data = await dataset(API_URL)
// const dataCleaned = cleanDataset(data)
const lastData = lastAvailableData(data)


/*
  Sección chart.js
*/

// Plugin para el Legend del canvas

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    console.log(legendContainer)

    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column';
      listContainer.style.margin = 15;
      listContainer.style.padding = 15;
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };
  
  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);
  
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.alignContent = 'center'
        li.style.listStyle = 'none'
        li.style.margin = '5px 20px 0';
  
        li.onclick = () => {
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

  
        // Text
        const textContainer = document.createElement('p');
        textContainer.style.backgroundColor = item.fillStyle;
        textContainer.style.fontSize = '12px';
        textContainer.style.fontWeight = 'bold';
        textContainer.style.opacity = 0.8;
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = '5px';
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.9)';
      tooltipEl.style.borderRadius = '8px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transition = 'all .1s ease';
      tooltipEl.style.zIndex = "1";
  
      const table = document.createElement('table');
      table.style.margin = '10px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  
  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.lines);
  
      const tableHead = document.createElement('thead');
  
      titleLines.forEach(title => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = 0;
  
        const th = document.createElement('th');
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);
  
        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });
  
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];
  
        const span = document.createElement('span');
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = '2px';
        span.style.marginRight = '10px';
        span.style.height = '10px';
        span.style.width = '10px';
        span.style.display = 'inline-block';
  
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;
  
        const td = document.createElement('td');
        td.style.borderWidth = 0;
  
        const text = document.createTextNode(body);
  
        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });
  
      const tableRoot = tooltipEl.querySelector('table');
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

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
