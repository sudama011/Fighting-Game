class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed === this.framesHold) {
            if (this.framesCurrent + 1 < this.framesMax) {
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0
            }
            this.framesElapsed = 0
        }
    }

}

class Fighter {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey = undefined
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking = false
        this.health = 100;
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
                this.attackbox.position.x,
                this.attackbox.position.y,
                this.attackbox.width,
                this.attackbox.height
            )
        }
    }

    update() {
        this.draw()
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}