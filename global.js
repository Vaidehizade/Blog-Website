console.log(global);


//global Object
global.setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int);
}, 3000);  //after 3 sec we get the msg

//now setInterval=>
const int = setInterval(() => {
    console.log('in the interval');
}, 1000);

console.log(__filename);
console.log(__dirname);