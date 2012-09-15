# query-stream

<img src=https://secure.travis-ci.org/'Dominic Tarr'/query-stream.png?branch=master>

create autosuggest widgets with a async function.

create a query stream:

``` js
var query = require('query-stream')
var qs = query(function (query, cb) {
  //make request to 
  make_query_to_wherever(query, cb)
})

```

then, write queries to it:

``` js
qs.write('samestuth')

//if you change your query it retries the search

qs.write('some stuff')
```

output chunks will look like this:

``` js
//assuming get(q, cb) calls back a string
"samestuff not found",
"CLEAR", //this means new results
"stuff1",
"stuff2",
etc..
```
`"CLEAR"` is a special message. 
it means that the following is a new response,
and the display should clear previous elements.


# UI

Pipe a input field into this, and out to a list.
NOTE, this stuff isn't implemented yet!
But it will look something like this:
``` js
//input-stream creates a stream of DOM events.
inputStream('#query', 'onchange', function (e) {
  return e.value
}).pipe(qs)
//element stream adds elements to a given root Element.
.pipe(elementStream('#results', function (e) {
  if(e === 'CLEAR')
    return this.root.removeAllChildren()
  return '<li>'+e+'</li>'
})

## License

MIT
