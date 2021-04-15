function fibonacci(i) {
    if (i === 0) {
        return 0;
    }
    if (i === 1) {
        return 1;
    }
    return fibonacci(i - 1) + fibonacci(i - 2);
}

let fibArray = [];
function fib(i) {
    if (i === 0) return 0;
    if (i === 1) return 1;
    if (fibArray[i]) return fibArray[i];
    fibArray[i] = fib(i - 1) + fib(i - 2);
    return fibArray[i];
}
console.log(fib(50));