const btnCalcularPrecio = document.getElementById('btnCalcularPrecio')

function calcularPrecio() {
    const totalPrice = document.getElementById('totalPrice').value

    const discountValue = document.getElementById('discountValue').value

    const discountCode = document.getElementById('discountCode').value
    
    console.log({
        totalPrice,
        discountValue,
        discountCode
    })

    const precioFinal = calcularPrecioFinal(totalPrice, discountValue, discountCode)

    const resultPrice = document.getElementById('resultPrice')

    resultPrice.innerText = `El precio total que debe pagar el cliente es de ${precioFinal}€.`
 
}

function calcularPrecioFinal(precioTotal, descuento, promocode) {
    const paraPromocode = document.getElementById('info-promocode')

    let cantidadDescontada = 100 - descuento

    if (promocode) {

        if (promocode === 'MARCA') {
            cantidadDescontada -= 5
            paraPromocode.classList.add('valid')
            paraPromocode.innerText = `Código promocional ${promocode} válido.`
        } else {
            paraPromocode.classList.add('no-valid')
            paraPromocode.innerText = `El código promocional ${promocode} no es válido.`
        }
    }

    
    const precioFinal = (precioTotal * cantidadDescontada) / 100

    return precioFinal

}