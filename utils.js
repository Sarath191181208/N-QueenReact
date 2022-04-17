
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmptyBoard(rows, cols) {
    // Creates  a 2D board filled  with 0's
    let returnArr = [];
    for (let i = 0; i < rows; i++) {
        returnArr.push(Array.from(Array(cols), () => 0));
    }
    return returnArr;
}

function getSingleDimArr(rows, cols) {
    let returnArr = [];
    for (let i = 0; i < rows * cols; i++)
        returnArr.push(0);
    return returnArr;
}

function getCopy(arr) {
    // returns a copy of the  arr
    return arr.map((row) => {
        return row.slice();
    });
}


function inBounds(i, j, rows, cols) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
}


class Node {
    constructor(idx1, idx2, val) {
        this.idx1 = idx1;
        this.idx2 = idx2;
        this.val = val;
    }
}
