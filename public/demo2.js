// demo2.js

let count = 0;

document.getElementById('counterButton').addEventListener('click', function () {
    count++;
    document.getElementById('counter').innerText = `Count: ${count}`;
});
