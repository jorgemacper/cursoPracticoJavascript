
function perimetroCuadrado(lado) {
    return lado * 4
}
perimetroCuadrado()

function areaCuadrado(lado) {
    return lado**2
}



function perimetroTriangulo(lado1, lado2, base) {
    return lado1 + lado2 + base
} 



function areaTriangulo(base, altura) {
    return (base*altura)/2
} 



function diametroCirculo(radio) {
    return radio * 2
}


function perimetroCirculo(radio) {
    const diametro = diametroCirculo(radio)
    return diametro * Math.PI
}


function areaCirculo(radio) {
    return (radio**2) * Math.PI
}



// Aquí interactuamos con el HTML

function calcularPerimetroCuadrado() {
    const input = document.getElementById('InputCuadrado')
    const value = input.value

    const perimetro = perimetroCuadrado(value)

    alert(perimetro)
}

function calcularAreaCuadrado() {
    const input = document.getElementById('InputCuadrado')
    const value = input.value

    const area = areaCuadrado(value)

    alert(area)
}