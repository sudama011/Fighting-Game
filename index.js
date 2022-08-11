const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.8,
    framesMax: 6
})
const gravity = 0.7
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    }
}
)

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
})



decreaseTimer()

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    // player movement
    if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 5
    }

    // enemy movement
    if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    else if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }

    // detect for collision
    if (rectangularCollision({ rect1: player, rect2: enemy }) && player.isAttacking) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (rectangularCollision({ rect1: enemy, rect2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // end the game based on health
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})