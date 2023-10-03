const { test, expect } = require('@jest/globals')
const { mergeSort, invertObject, sortPages } = require('./report_utils.js')


const testFunc = (input, expectedOutput, func) => {
    const inner = () => {
        expect(func(input)).toEqual(expectedOutput)
    }

    return inner
}


test('mergeSort test 1', testFunc([-1,-2,-3,-4,-5,0,1,2], [-5,-4,-3,-2,-1,0,1,2], mergeSort))
test('mergeSort test 2', testFunc([1], [1], mergeSort))
test('mergeSort test 3', testFunc([], [], mergeSort))

test('invertObject test 1', testFunc({cats: 1, dogs: 2, rabbits: 3, snakes: 3, mice: 4}, 
    new Map([[1, ["cats"]], [2, ["dogs"]], [3, ["rabbits", "snakes"]], [4, ["mice"]]]), invertObject))
test('invertObject test 2', testFunc({humans: 2999}, new Map([[2999, ["humans"]]]), invertObject))
test('invertObject test 3', testFunc({}, new Map(), invertObject))

test('sortPages test 1', testFunc({cats: 1, dogs: 2, rabbits: 3, snakes: 3, mice: 4}, 
    new Map([[4, ["mice"]], [3, ["rabbits", "snakes"]], [2, ["dogs"]], [1, ["cats"]]]), sortPages))
test('sortPages test 2', testFunc({humans: 2999}, new Map([[2999, ["humans"]]]), sortPages))
test('sortPages test 3', testFunc({}, new Map(), sortPages))