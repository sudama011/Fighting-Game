const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function rectangularCollision({ rect1, rect2 }) {
    if (rect1.attackbox.position.x + rect1.attackbox.width >= rect2.position.x &&
        rect1.attackbox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackbox.position.y + rect1.attackbox.height >= rect2.position.y &&
        rect1.attackbox.position.y <= rect2.position.y + rect2.height
    ) return true
    return false
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#result').style.display = 'flex'
    if (player.health === enemy) {
        document.querySelector('#result').innerHTML = 'Tie'
    }
    else if (player.health > enemy.health) {
        document.querySelector('#result').innerHTML = 'Player 1 wins'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#result').innerHTML = 'Player 2 wins'
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer == 0) {
        determineWinner({ player, enemy, timerId })
    }
}

function showBody() {

    if (document.getElementsByTagName('body')[0].style.overflow == 'visible') {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        document.documentElement.scrollTop = 0;
    }
    else {
        document.getElementsByTagName('body')[0].style.overflow = 'visible'
    }
}