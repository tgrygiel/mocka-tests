const unique = (collection, uniqueAttr) => {
    // return Array.from(new Set(collection))
    
    if(!uniqueAttr) {
        return Array.from(new Set(collection))
    } else {
        const set = new Set()
        const result = []
        collection.forEach(item => {
            if(!set.has(item[uniqueAttr])) {
                set.add(item[uniqueAttr])
                result.push(item)
            }
        })
        return result
    }
}

const SEPARATOR = ','
const memoize = (wrapper) => {
    const cache = new Map()
    return (...args) => {
        const key = JSON.stringify(args)
        if(!cache[key]) {
            cache[key] = wrapper(...args)
        }
        return cache[key]
    }
} 
// (arg) => wrapper(arg)


module.exports = {
    unique,
    memoize,
}