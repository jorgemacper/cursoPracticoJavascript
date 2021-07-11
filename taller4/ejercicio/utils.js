function calcularMediaAritmetica(lista) {

    const sumaLista = lista.reduce((acc, cv) => acc+cv)
    
    const promedioLista = sumaLista / lista.length

    return promedioLista
}

function random(num) {
    return Math.floor(Math.random()*num)
}

export { calcularMediaAritmetica, random }