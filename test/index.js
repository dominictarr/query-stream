var query = require('../')
var assert = require('assert')

var examples = {
  A : [1, 2, 3],
  AA: [1, 2, 3, 4, 5],
  B : [6, 7, 8]
}

var expected = [ 1, 2, 3, 'CLEAR', 6, 7, 8, 'CLEAR', 1, 2, 3, 4, 5]

var qs = query(function (key, cb) {
  cb(null, examples[key] || [])
})
var actual = []
qs.on('data', actual.push.bind(actual))

qs.write('A')
qs.write('B')
qs.write('AA')
qs.end()

console.log(actual)
assert.deepEqual(actual, expected)
console.log('passed')


