var through = require('through')

module.exports = function (request, init) {
  var self, requests = 0, ended = false, max = -1, stream = null
  
  function cleanup() {
    ended = true
  }

  return self = through (function (data) {
    //each chunk calls the request.
    var args = Array.isArray(data) ? data.concat(next) : [data, next]
      var requestN = ++requests
      request.apply(this, args)

      function append (data) {
        self.queue(data)
      }

      function next (err, data) {
        if(ended) return
        // forget old requests there is a newer one.
        if(requests !== requestN) return
        //this means the stuff previously emitted is not wanted any more
        self.buffer.length = 0
        if(requestN !== 1)
          self.queue('CLEAR')

        if(err) return cleanup(), self.emit('error', err)

        if(Array.isArray(data))
          data.forEach(append)
        else if('function' == typeof data.pipe) {
          if(stream) stream.removeListener('data', append)
          stream = data.on('data', append)
          if(stream.resume) stream.resume() //just in case.
        }
        else
          append(data)
      }
  }, cleanup)
}

