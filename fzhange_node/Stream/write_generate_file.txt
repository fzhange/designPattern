// const fs = require('fs');
// const path = require('path');
// const zlib = require('zlib');
// const vm = require('vm');

// const wrapper =  `(function(exports,require,module,__filename,__dirname){
//     console.log('>>>>>>>>');
//     return {
//         a:10
//     }
// })`



// var compiledWrapper = vm.runInThisContext(wrapper, { // (2)
//     filename:__filename,
//     lineOffset: 0,
//     displayErrors: true
//   });
//   console.log('compiledWrapper: ', compiledWrapper);