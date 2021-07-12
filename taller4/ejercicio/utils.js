function calcularMediaAritmetica(lista) {

    const sumaLista = lista.reduce((acc, cv) => acc+cv)
    
    const promedioLista = sumaLista / lista.length

    return promedioLista
}

function random(num) {
    return Math.floor(Math.random()*num)
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

export { calcularMediaAritmetica, random, createColorsRandom }