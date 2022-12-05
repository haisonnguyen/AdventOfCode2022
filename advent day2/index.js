const f = require('fs/promises');

async function read_input(file_name) {
    let data= await f.readFile(file_name, { encoding: 'utf8' });
    /*  
        Two things:
        - Windows include carriage returns so lets split this to reduce simplicity
        - Split data into groups of lists of strings
    */ 
    return  data.replace(/\r/g, '').split('\n');
}

// x is your opponent's move
// y is the strategy guide suggestion
function calculateRound(x,y) {
    let outcome_sum = 0;
    console.log('\nx: ' + x + ' y: '+ y);
    switch(x) {
        // Opponent chooses Rock
        case 'A':
            // Draw
            if (y == 'X') {
                outcome_sum+=4
            }
            // Win
            else if (y == 'Y') {
                outcome_sum+=8
            }
            // Loss
            else
                outcome_sum+=3
            break;
        // Opponent chose Paper
        case 'B':
            // Draw
            if(y == 'Y') {
                outcome_sum+=5
            }
            // Win
            else if (y == 'Z') {
                outcome_sum+=9
            }
            else
                outcome_sum+=1
            break;
        case 'C':
            // Draw
            if(y == 'Z') {
                outcome_sum+=6;
            }
            // Win
            else if (y == 'X') {
                outcome_sum+=7;
            }
            else
                outcome_sum+=2
            break;
    }
    console.log(outcome_sum);
    return outcome_sum;
} 

async function solve(input) {
    let strategy_guide = await read_input(input);
    console.log(strategy_guide[0]);
    let sum = strategy_guide.map((x) => {
        _x = x.split(' ');
        return calculateRound(_x[0], _x[1]);
    }).reduce((partialSum, a) => partialSum + a, 0);

    return sum;
}

(async() => {
    let ans = await solve('input.txt');
    console.log(ans);
})();

