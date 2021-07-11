function calcularMediaAritmetica(lista) {    
        const sumaLista = lista.reduce((acc, cv) => acc+cv)
        
        const promedioLista = sumaLista / lista.length
    
        return promedioLista
    }
    

const lista1 = [
    100,
    200,
    500,
    400000
]


function esPar(numerito) {
    if (numerito % 2 === 0) {
        return true
    }
    return false
}

function calcularMediana(lista) {
    const mitadLista = parseInt(lista.length / 2)
    let mediana

    // Ordenar la lista de menor a mayor
    lista.sort(function(a, b) {
        return a - b
    })

    console.log(lista)

    if (esPar(lista.length)) {
        const elemento1 = lista[mitadLista - 1]
        const elemento2 = lista[mitadLista]
    
        mediana = calcularMediaAritmetica([elemento1, elemento2])
        
    } else {
        mediana = lista[mitadLista]
    }

    return mediana
}

