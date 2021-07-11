
const dataset = async function(api) {
    const response = await fetch(api)
    const dataset = await response.json()

    return dataset
}

export default dataset