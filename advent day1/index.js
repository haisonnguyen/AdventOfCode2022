const f = require('fs/promises');

async function read_input(file_name) {
    let data= await f.readFile(file_name, { encoding: 'utf8' });
    /*  
        Two things:
        - Windows include carriage returns so lets split this to reduce simplicity
        - Split data into groups of lists of strings
    */ 
    return data.replace(/\r/g, '').split('\n\n'); 
}

async function solve(input) {

    let items = await read_input(input);
    let max = 0;

    /*
        - Split the string, map each index to a number, and then reduce to get a sum
        https://stackoverflow.com/questions/4437916/how-to-convert-all-elements-in-an-array-to-integer-in-javascript

        https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    */
    for(let groups of items) {
        let sum = groups.split('\n').map(Number).reduce((partialSum, a) => partialSum + a, 0);
        if(max < sum) {

            max = sum;
        }
    }

    return max;
}

(async () => {
    let ans = await solve('input.txt');
    console.log('max: '+ ans);
})();
