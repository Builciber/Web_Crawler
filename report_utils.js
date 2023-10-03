/* This module consists of utility functions that helps the 
`printReport` function in report.js to carry out its task*/


function mergeSort(array) {
    // Takes an array as input.
    // returns a new array that is the sorted version (ascending) of the original array
    if (array.length < 2) {
        return array
    }

    const floor = Math.floor(array.length / 2)
    const firstHalf = array.slice(0, floor)
    const secHalf = array.slice(floor)
    const firstSorted = mergeSort(firstHalf)
    const secSorted = mergeSort(secHalf)
    return merge(firstSorted, secSorted)
}

function merge(arr1, arr2) {
    // Helper function for mergeSort function above
    // Takes two sorted arrays as inputs.
    // Returns a larger sorted array that results from merging the original arrays.
    let merged = []
    let i = 0
    let j = 0
    while (i !== arr1.length && j !== arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i])
            i++
        } else {
            merged.push(arr2[j])
            j++
        }
    }
    if (arr1.length !== i) {
        merged = merged.concat(arr1.slice(i))
    }
    if (arr2.length !== j) {
        merged = merged.concat(arr2.slice(j))
    }

    return merged
}


function invertObject(object) {
    // Takes an object literal as input.
    // Returns a map that has the keys in `object` as values and the values in `object` as keys
    const inverted = new Map()
    for (const key in object) {
        let value = object[key]
        if (!inverted.has(value)) {
            inverted.set(value, [key])
        } else {
            inverted.get(value).push(key)
        }
    }

    return inverted
}


function sortPages(pages) {
    // This function sorts an object by values in descending order.
    // Takes an object literal as input.
    // Returns a map that is the sorted version (descending order) of the `pages` object.
    const inverted = invertObject(pages)
    const keys = []
    for (const key of inverted.keys()) {
        keys.push(key)
    }
    const sortedKeys = mergeSort(keys)
    sortedKeys.reverse()
    const sortedPages = new Map()
    for (const key of sortedKeys) {
        sortedPages.set(key, inverted.get(key))
    }

    return sortedPages
}


module.exports = {
    mergeSort,
    invertObject,
    sortPages
}