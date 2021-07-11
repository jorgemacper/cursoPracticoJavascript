/*
   MEDIA PONDERADA
*/

// Ejemplo notas de exámenes de un alumno. No todos los examenes tienen el mismo peso, con lo cual, vamos a generar una lista con las notas del examen y el peso del mismo.

// [nota, peso]
const notasConPonderacion = [
    [
        7, 25
    ],
    [
        5, 35
    ],
    [
        9, 40
    ]
]

const notas = notasConPonderacion.map(function (element) {
    return element[0]
})

function calcularMediaAritmetica(lista) {
        const sumaLista = lista.reduce((acc, cv) => acc+cv)
        
        const promedioLista = sumaLista / lista.length
    
        return promedioLista.toFixed(2)
}

function calcularMediaPonderada(lista) {
    // Recorremos las ponderaciones de la lista con el método map() para posteriormente sumarlos con el método reduce()
    // Esto devuelve la suma de las ponderaciones
    const sumaPonderaciones = lista.map( element =>  element[1]).reduce( (acc, cv) => acc + cv)

    // Hacemos lo mismo que antes pero con las notas ponderadas que se encuentra en la primera posición del array (posición 0)
    const notasPonderadas = lista.map( element => element[0] * element[1]).reduce( (acc, cv) => acc + cv)

    // Una vez calculada el sumatorio de las notas con sus respectivas ponderaciones y la suma de las ponderaciones, podemos calcular la media ponderada
    const mediaPonderada = notasPonderadas / sumaPonderaciones

    return mediaPonderada.toFixed(2)
}

// Media aritmética de las notas
const notaMedia = calcularMediaAritmetica(notas)
console.log(`La nota media es de ${notaMedia}`)

// Media ponderada de las notas
const notaMediaPonderada = calcularMediaPonderada(notasConPonderacion)
console.log(`La nota media ponderada es de ${notaMediaPonderada}`)
