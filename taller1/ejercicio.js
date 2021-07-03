// Calcular la altura de un triángulo isósceles

function calcularAlturaTrianguloIsos() {

    const lado1 = document.getElementById('lado1Triangulo').value
    const lado2 = document.getElementById('lado2Triangulo').value
    const base = document.getElementById('baseTriangulo').value

    if (lado1 === lado2) {

        const operacion = (lado1*lado2) - (base/2)**2
        const altura =  Math.sqrt(operacion)

        console.log(operacion, altura)

        alert('La altura del Triángulo isósceles es de: ' + altura + 'cm.')
    
    } else {
        alert('Lo siento, pero en un triángulo isósceles ambos lados son iguales.')
    }
    
}

