const { fetchGeo, fetchOffieces, geoOffieces } = require('../src/api')

const chai = require('chai')
const expect = chai.expect
const assert = chai.assert



describe('API http requests', () => {
    
    before(() => {
        global.fetch = require('node-fetch')
    });

    after(() => {
        delete global.fetch
    });

    it('should receive geo data from api @integration', async () => {
        const res = await fetchGeo()
        expect(typeof res).to.equal("object")
        const keysAreCountryCodes = Object.keys(res).every(k => typeof k === 'string' && k.length === 2)
        expect(keysAreCountryCodes)
    });

    it('should merge geo and offiecies', async() => {
        const geoOffices = await geoOffieces()
        expect(typeof geoOffices).to.equal("object")
        console.log('geoOffices!!!!!!!!!!!!!!!!!!', geoOffices)
        console.log('-------------------------------------------------------')
    })
});