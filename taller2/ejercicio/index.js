const promocodes = [
    {
        name: 'CODE5',
        discount: 5
    },
    {
        name: 'CODE10',
        discount: 10
    }
]

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

function calcularPrecioFinal(precioTotal, descuento, promocodeInput) {
    const paraPromocode = document.getElementById('info-promocode')

    let cantidadDescontada = 100 - descuento

    const isPromocodeValid = (promocode) => {
        return promocode.name === promocodeInput
    }

    const userPromocode = promocodes.find(isPromocodeValid)

    console.log(userPromocode)

    if (!userPromocode) {

        paraPromocode.classList.remove('valid')
        paraPromocode.innerText = `El código promocional ${promocodeInput} no es válido.`

    } else {
        
        cantidadDescontada -= userPromocode.discount
        paraPromocode.classList.add('valid')
        paraPromocode.innerText = `Código promocional ${userPromocode.name} válido con ${userPromocode.discount}% dto.`
    }

    
    const precioFinal = (precioTotal * cantidadDescontada) / 100

    return precioFinal

}