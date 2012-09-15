var query = require('../')
var assert = require('assert')

var examples = {
  A : [1, 2, 3],
  AA: [1, 2, 3, 4, 5],
  B : [6, 7, 8]
}

var expected = [ 1, 2, 3, 'CLEAR', 6, 7, 8, 'CLEAR', 1, 2, 3, 4, 5]
var actual = []

var qs = query(function (key, cb) {
  cb(null, examples[key] || [])
})

var actual = []
qs.on('data', actual.push.bind(actual))
qs.pause()
qs.on('data', function () {
  qs.pause()
})
function read () {
  var l = actual.length
  qs.resume()
  //hopefully, something has been added
  return actual[l] //else, this will be undefined
}

qs.write('A')
assert.deepEqual(actual, [])
read(); read();
assert.deepEqual(actual, [1, 2])
read();
assert.deepEqual(actual, [1, 2, 3])
qs.write('B')
read(); read();
assert.deepEqual(actual, [1, 2, 3, 'CLEAR', 6])
qs.write('AA')
while(read())
  console.log(actual)
console.log('passed')
