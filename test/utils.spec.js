const { unique, memoize } = require('../src/utils')
const assert = require('assert')
const chai = require('chai')
chai.should()
const sinon = require('sinon')
const { Calculator } = require('../src/calc')


 
describe('Unique operator', () => {
    it('should return the colllection if there is no repetitions', () => {
        assert.deepStrictEqual(unique([1,2,3,4]), [1,2,3,4])
    });
    it('should remove repetitions', () => {
        assert.deepEqual(unique([1,2,2,4]), [1,2,4])
    });
    it('should return empty coll for empty input', () => {
        assert.deepEqual(unique([]), [])
    });
    it('should remove repetitions by attribute', () => {
        const input = [
            {
                id: 231,
                name: 'Janek',
                nationallity: 'PL'
            },
            {
                name: 'Hans',
                nationallity: 'DE'
            },
            {
                name: 'Krysia',
                nationallity: 'PL'
            },
        ]

        const result = [
            {
                id: 231,
                name: 'Janek',
                nationallity: 'PL'
            },
            {
                name: 'Hans',
                nationallity: 'DE'
            },
        ]
        
        assert.deepEqual(unique(input, 'nationallity'), result)
    });
});


describe('momoize decorator', () => {
    it('should return the same result as the wrapped function', () => {
        const square = (n) => n * n
        const memoizedSquare = memoize(square)

        const rawResult = square(5)
        const momoizedResult = memoizedSquare(5)
        rawResult.should.equal(momoizedResult)
    });

    it('should call the wrapper function after memoize was call', () => {
        const spy = sinon.spy()
        // const square = (n) => n * n
        const memoizedSquare = memoize(spy)

        //Tu jeszcze nie 
        spy.notCalled.should.be.true
        // or assert.equal(spy.notCalled, true)

        const momoizedResult = memoizedSquare(5)
        spy.called.should.be.true
        // Ale tu juz tak
    });

    it('should only call wrapper function once if called with the same parameter multiply times', () => {
        const square = (n) => n * n
        const spy = sinon.spy(square)
        const memoizedSquare = memoize(spy)
        

        sinon.assert.notCalled(spy)
        const result1 = memoizedSquare(5)
        const result2 = memoizedSquare(5)
        const result3 = memoizedSquare(5)

        sinon.assert.calledOnce(spy)
        sinon.assert.alwaysCalledWithExactly(spy, 5)

    });

    it('should memoize func whic operate on varius number of parameters', () => {

        const spy = sinon.spy(Calculator, 'add')

        // const square = (n) => n * n
        // const spy = sinon.spy(square)

        sinon.assert.notCalled(spy)

        const memoizedAdd = memoize(Calculator.add)
        const result1 = memoizedAdd(1, 2)
        const result2 = memoizedAdd(4, 5)

        // sinon.assert.notCalled(spy)

        const result3 = memoizedAdd(4, 5)
        const result4 = memoizedAdd(4, 5)
        const result5 = memoizedAdd(1, 2)

        sinon.assert.callCount(spy, 2)

        result1.should.equal(3)
        result2.should.equal(9)
        result3.should.equal(9)
        result4.should.equal(9)
        result5.should.equal(3)

        sinon.assert.calledWith(spy, 1, 2)
        sinon.assert.calledWith(spy, 4, 5)
        // sinon.assert

        // sinon.assert.notCalled(spy)
        // const result1 = memoizedSquare(5, 4, 2)
        // const result2 = memoizedSquare(5, 4, 2)
        // const result3 = memoizedSquare(5, 4, 2)

        // sinon.assert.calledOnce(spy)
        // sinon.assert.alwaysCalledWithExactly(spy, 5)
    });
});