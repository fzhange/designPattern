var buffer =
  'e1 00 00 02 00 05 03 96 01 01 00 00 00 07 03 8e 00 21 00 00 00 00 0c 16 03 84 00 01 02 c1 93 00 ff ff ff ff ff ff ff ff 00 01 00 06 00 00 00 02 03 6c 00 00 00 06 01 c2 86 57 00 07 00 46 09 21 00 02 86 57 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 58 04 09 27 00 10 00 0e 00 43 00 50 00 50 00 20 00 20 00 20 00 00 09 17 00 02 03 00 09 11 00 02 00 05 86 70 00 07 00 46 09 21 00 02 86 70 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 4b 28 09 27 00 10 00 0e 00 53 00 56 00 52 00 20 00 20 00 20 00 00 09 17 00 02 04 00 09 11 00 02 00 02 86 89 00 07 00 46 09 21 00 02 86 89 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 4b c4 09 27 00 10 00 0e 03 94 00 53 00 70 00 4f 20 82 00 20 00 00 09 17 00 02 04 00 09 11 00 02 00 02 86 a2 00 07 00 46 09 21 00 02 86 a2 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 e0 18 09 27 00 10 00 0e 03 94 6e 29 fe ff 5e a6 fe ff 00 20 00 00 09 17 00 02 03 01 09 11 00 02 00 02 86 d4 00 07 00 46 09 21 00 02 86 d4 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 f0 6c 09 27 00 10 00 0e 00 53 00 70 00 2d 00 56 00 4f 20 82 00 00 09 17 00 02 04 00 09 11 00 02 00 02 87 14 00 06 00 40 09 21 00 02 87 14 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 05 52 28 00 00 00 00 09 24 00 04 00 02 4a 24 09 27 00 10 00 0e 00 50 00 41 00 57 00 50 00 20 00 20 00 00 09 11 00 02 00 02 00 01 00 04 01 9e 82 6e 00 0a 00 82 09 21 00 02 82 6e 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 52 28 01 03 00 00 09 24 00 04 00 02 4a 04 09 27 00 10 00 0e 00 4e 00 42 00 50 00 20 00 20 00 20 00 00 09 11 00 02 00 01 09 90 00 08 20 19 09 09 00 19 46 00 f2 37 00 04 ff ff ff ff f9 98 00 04 ff ff ff ff 09 4b 00 22 00 03 00 1e 4a 05 20 00 0f 20 00 7f ff ff 4a 06 20 00 0f 20 00 7f ff ff 4a 07 20 00 0f 20 00 7f ff ff 82 71 00 0a 00 68 09 21 00 02 82 71 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 52 28 00 01 00 00 09 24 00 04 00 02 f0 e5 09 27 00 10 00 0e 81 09 fe ff 64 0f fe ff 00 20 00 20 00 00 09 17 00 02 03 00 09 11 00 02 00 01 09 90 00 08 20 19 09 09 00 19 46 00 f9 98 00 04 ff ff ff ff 09 50 00 0a f0 e5 20 00 0a a0 00 7f ff ff 82 d0 00 07 00 4e 09 21 00 02 82 d0 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 41 82 09 27 00 10 00 0e 00 48 00 52 00 20 00 20 00 20 00 20 00 00 09 11 00 02 00 02 09 50 00 0a 41 82 82 00 0a a0 00 7f ff ff 82 d7 00 07 00 4e 09 21 00 02 82 d7 09 2f 00 04 00 01 00 06 09 3f 00 0c 00 00 20 00 00 01 42 28 00 00 00 00 09 24 00 04 00 02 50 0a 09 27 00 10 00 0e 00 52 00 52 00 20 00 20 00 20 00 20 00 00 09 11 00 02 00 03 09 50 00 0a 50 0a 80 00 0a e0 00 7f ff ff ';
const data = Buffer.from(buffer);

console.log('data: ', data);
const actionBuf = Buffer.alloc(2);

data.copy(actionBuf, 0, 22, 24);
console.log('actionBuf.toString("ascii"): ', actionBuf.toString('ascii'));
console.log('actionBuf.inspect(): ', actionBuf.inspect());

console.log('actionBuf.toString(): ', actionBuf.toString().length);
console.log('actionBuf: ', actionBuf);
let action_type = actionBuf.readUInt16BE();
console.log('action_type: ', action_type);
