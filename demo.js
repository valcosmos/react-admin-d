const fn = (...num) => Array.from(num).reduce((total, num) => total + num)

console.log(fn(1, 10, 11))
