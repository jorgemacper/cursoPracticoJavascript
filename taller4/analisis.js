// Helpers o Utils
function calcularMediaAritmetica(lista) {
    
    const sumaLista = lista.reduce((acc, cv) => acc+cv)
    
    const promedioLista = sumaLista / lista.length

    return promedioLista
}


function esPar(numerito) {
return (numerito % 2 === 0)
}




const salariosCol = colombia.map(
    function (persona) {
        return persona.salary
    }
)

const salariosColSorted = salariosCol.sort(
    function (salaryA, salaryB) {
        return salaryA - salaryB
    }
)

// Calculadora de medianas
function medianaSalariosCol(lista) {
    const mitad = parseInt(lista.length / 2)

    if (esPar(lista.length)) {
        const personaMitad1 = lista[mitad-1]
        const personaMitad2 = lista[mitad]

        const mediana = calcularMediaAritmetica([personaMitad1, personaMitad2])

        return mediana

    } else {
        const personaMitad = lista[mitad]
        return personaMitad
    }
}

// Mediana general
const medianaGeneralCol = medianaSalariosCol(salariosColSorted)


// Mediana top 10%

const spliceStart = salariosColSorted.length * 0.9
const spliceCount = salariosColSorted.length - spliceStart

const salariosColTop10 = salariosColSorted.splice(spliceStart, spliceCount)

console.log(salariosColTop10)


const medianaTop10Col = medianaSalariosCol(salariosColTop10)



console.log(`
    Media aritmético: ${calcularMediaAritmetica(salariosColSorted)}
`)

console.log(`
    Mediana: ${medianaGeneralCol}
`)

console.log(`
    Mediana Top 10%: ${medianaTop10Col}
`)