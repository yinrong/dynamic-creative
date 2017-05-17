dynamic-creative
================

## Usage

### Example (not implemented)
```javascript
const DynamicCreative = require('dynamic-creative').DynamicCreative
let creative1 = new DynamicCreative({
  w: 200,
  h: 150,
})
creative1.add({
  type: 'Image',
  w: 20,
  h: 20,
  x: 5,
  y: 5,
})
creative1.add({
  type: 'Text',
  w: 20,
  h: 20,
  x: 5,
  y: 5,
})
let creative2 = template.transform({
  w: 400,
  h: 300,
})
console.log(creative2.getElements())
/* output
[
  {
    type: 'Image',
    w: 40,
    h: 40,
    x: 10,
    y: 10,
  },
  {
    type: 'Text',
    w: 40,
    h: 40,
    x: 10,
    y: 10,
  },
]
*/

```

## Development

### Requirement
* node
* Linux/Darwin

### Debug
```sh
npm i
npm run debug
```

open **/index.html in your browser to see the result
