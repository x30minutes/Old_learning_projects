console.log(Math.log10(1000));//3
//10^3 = 1000
console.log(Math.log10(10000));//4
//10^4 = 10000

const filesize = 10000; //bytes
const units = "BKMGT";

// ... 1000 ... 1000000 ... 1000000000 ... 1000000000000 ...
//log10
// ... 3 ... 6 ... 9 ... 12 ... 15 ...
//log 10(filesize)/3
// ... 1 ... 2 ... 3 ... 4 ... 5 ...

const index = Math.floor(Math.log10(filesize)/3);

// 700 -> 700/1000^0
// 10000 -> 10000/1000^1 
// 10000000 -> 10000000/1000^2

const filesizeHR = (filesize/Math.pow(1000, index)).toFixed(1);

console.log(`${filesizeHR}${units[index]}`;);