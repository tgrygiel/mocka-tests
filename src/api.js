const baseUrl = 'http://localhost:3000'
const axios = require('axios')


const fetchGeo = () => 
    fetch(`${baseUrl}/geo`)
        .then(res => res.json())

const fetchOffieces = () => 
    fetch(`${baseUrl}/offices`)
        .then(res => res.json())
    
const axiosGeo = () => 
    axios(`${baseUrl}/geo`)
        .then(res => res.data)

const axiosOffices = () => 
    axios(`${baseUrl}/offices`)
        .then(res => res.data)
        

const geoOffieces = async () => {
    const [geo, offieces] = await Promise.all([fetchGeo(), fetchOffieces()])
    const geoEntries = Object.entries(geo)
    return offieces.reduce((acc, currOffiece) => {
        const code = geoEntries.find(entry => entry[1] === currOffiece.country)[0]
        if(!acc[code]) {
            acc[code] = {
                country: currOffiece.country,
                offices: []
            }
        }
        acc[code].offices.push(currOffiece)
        return acc
    }, {})
}


module.exports = {
    fetchGeo,
    fetchOffieces,
    geoOffieces,
    axiosGeo,
    axiosOffices
}