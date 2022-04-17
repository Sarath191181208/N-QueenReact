let head;
let tempNode;

function isSafe(board, row, col) {
    N = board.length;

    // left
    for (let i = 0; i < col; i++) {
        if (board[row][i])
            return false;
    }

    // upper-left
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false

    // lower-left
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j])
            return false

    return true
}

function solveNQUtil(board, col) {
    N = board.length;

    if (col >= N)
        return true

    for (let i = 0; i < N; i++) {

        if (isSafe(board, i, col) == true) {

            board[i][col] = 1
            tempNode.next = new Node(i, col, 1);
            tempNode = tempNode.next;

            if (solveNQUtil(board, col + 1) == true)
                return true

            board[i][col] = 0
            tempNode.next = new Node(i, col, 0);
            tempNode = tempNode.next;
        }
        else {
            tempNode.next = new Node(i, col, 1);
            tempNode = tempNode.next;
            tempNode.next = new Node(i, col, 0);
            tempNode = tempNode.next;
        }
    }
    return false
}

function solveNQ(board) {
    head = new Node(null, null);
    tempNode = head;

    solveNQUtil(board, 0);
    return head.next;
}

// Driver Code
solveNQ()
