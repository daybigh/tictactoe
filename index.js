let player1Score = 0
let player2Score = 0

let player1Move = true

btn00 = {
    "clicked": false,
    "isX": false
}

btn01 = {
    "clicked": false,
    "isX": false
}

btn02 = {
    "clicked": false,
    "isX": false
}

btn10 = {
    "clicked": false,
    "isX": false
}

btn11 = {
    "clicked": false,
    "isX": false
}

btn12 = {
    "clicked": false,
    "isX": false
}

btn20 = {
    "clicked": false,
    "isX": false
}

btn21 = {
    "clicked": false,
    "isX": false
}

btn22 = {
    "clicked": false,
    "isX": false
}




allButtons = {
    "btn00": btn00,
    "btn01": btn01,
    "btn02": btn02,
    "btn10": btn10,
    "btn11": btn11,
    "btn12": btn12,
    "btn20": btn20,
    "btn21": btn21,
    "btn22": btn22
}

function click(id) {
    let btn = document.getElementById(id)

    if (allButtons[id].clicked) {
        return null
    }

    if (player1Move) {
        btn.textContent = "O"
        allButtons[id].isX = false
        allButtons[id].clicked = true
        player1Move = !player1Move
    } else {
        btn.textContent = "X"
        allButtons[id].isX = true
        allButtons[id].clicked = true
        player1Move = !player1Move
    }
}

function main(id) {
    click(id)
    if (checkGameEnd()) {
        setTimeout(clearGame, 500)
        updateScore()
    }
}

function clearGame() {
    let temp = document.querySelectorAll('#main button')
    for (var i = 0; i < temp.length; i++) {
        allButtons[temp[i].id].clicked = false
        allButtons[temp[i].id].isX = false
        temp[i].textContent = ''
    }
    player1Move = true
}

function checkGameEnd() {
    let row0 = [btn00, btn01, btn02]
    let row1 = [btn10, btn11, btn12]
    let row2 = [btn20, btn21, btn22]
    let board = [row0, row1, row2]
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if ((i == 1 && i == 1 && board[i][j].clicked)) {
                if (checkWin(getRDiagonal(board, i, j) || getLDiagonal(board, i, j)) || checkWin(getHotizontal(board, i, j)) || checkWin(getVertical(board, i, j))) {
                    return true
                }
            } 

            if ((i + j) == 2 && board[i][j].clicked) {
                if (checkWin(getRDiagonal(board, i, j) || checkWin(getHotizontal(board, i, j)) || checkWin(getVertical(board, i, j)))) {
                    return true
                }

            }
            if ((i + j) % 2 == 0 && board[i][j].clicked) {
                if (checkWin(getLDiagonal(board, i, j)) || checkWin(getHotizontal(board, i, j)) || checkWin(getVertical(board, i, j))) {
                    return true
                }
            }

            if (checkWin(getHotizontal(board, i, j)) || checkWin(getVertical(board, 1, j))) {
                return true
            }
        }
    }
    return false
}

function checkWin(boxLst) {
    if (boxLst[0].clicked == true && boxLst[1].clicked == true && boxLst[2].clicked == true) {
        if (boxLst[0].isX == boxLst[1].isX && boxLst[1].isX == boxLst[2].isX) {
            return true
        }
    }
    return false
}

function getHotizontal(board, i, j) {
    return [board[i][0], board[i][1], board[i][2]]
}

function getVertical(board, i, j) {
    return [board[0][j], board[1][j], board[2][j]]
}

function getLDiagonal(board, i, j) {
    return [btn00, btn11, btn22]
}

function getRDiagonal(board, i, j) {
    return [btn20, btn11, btn02]
}

function updateScore() {
    if (player1Move) {
        player2Score += 1
        document.getElementById('p2-score').innerText = "Player 2: " + player2Score
    }
    else {
        player1Score += 1
        document.getElementById('p1-score').innerText = "Player 1: " + player1Score
    }
}

