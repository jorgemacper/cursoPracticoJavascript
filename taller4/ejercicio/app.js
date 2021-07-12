import dataset from "./dataset.js"
import { calcularMediaAritmetica, random, createColorsRandom } from "./utils.js"
import { htmlLegendPlugin, externalTooltipHandler } from "./plugins-chart.js"


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

export { lastAvailableData, filterDataSet, parseDataToPercentage, cleanDataset }