const canvas = document.createElement('canvas')
canvas.id = 'particles_canvas'
canvas.style.position = 'fixed'
canvas.style.pointerEvents = 'none'
document.body.append(canvas)
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false;
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', function() { 
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

let particles = []
let animating = false

function animate() {
    particles = particles.filter(element => !element.delete)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
        particle.update()
        particle.draw()
    });
    if(particles.length > 0) {
        requestAnimationFrame(animate)
    } else {
        animating = false
    }
}
class Konfetti {
    constructor(x, y, size) {
        this.delete = false
        this.x = x
        this.y = y
        this.speedX = Math.random() * 10 - 5
        this.speedY = Math.random() * 10 - 5
        this.friction = .995
        this.size = size
        this.angel = Math.random()
        this.width = 20
        this.height = 40
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 50%)'
        particles.push(this)
        if (!animating) {
            animating = true
            animate()
        }
    }
    update() {
        this.size -= 0.01
        this.speedX *= this.friction
        this.speedY *= this.friction
        this.x += this.speedX
        this.y += this.speedY
        if (this.size <= 0.01 || this.y > canvas.height || this.y < - this.height || this.x > canvas.width || this.x < - this.width) {
            this.delete = true
        }
    }
    draw() {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width * this.size, this.height * this.size)
        ctx.fill()
        ctx.restore()
    }
}

function konfetti_corners() {
    spawn_konfetti(50, 0, 0)
    spawn_konfetti(50, 0, window.innerHeight)
    spawn_konfetti(50, window.innerWidth, 0)
    spawn_konfetti(50, window.innerWidth, window.innerHeight)
}

function spawn_konfetti(count = 50, x = window.innerWidth * .5 - 1, y = 0) {
    for (let i = 0; i < count; i++) {
        new Konfetti(x, y, 1)
    }
}

const symbols1 = ["🍎", "🍒", "🍋", "🍉", "🍇"]
const symbols2 = ["🌷", "🌼", "🌻", "🌺", "🍀"]
const symbols3 = ["☀️", "🌈", "⭐", "🌙", "🌍"]
const symbols4 = ["🧥", "👖", "🥾", "🎩", "🕶️"]
const symbols5 = ["🚗", "🚛", "🚂", "🛳️", "✈️"]
const symbols6 = ["🪙", "💵", "💰", "💎", "👑"]

function shuffle(array) {
    let currentIndex = array.length
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}

let money = 1000

function update_money() {
    document.getElementById('money').innerText = money + '🪙'
}

class Slot_ms {
    constructor(price, symbols) {
        this.price = price
        this.symbols = symbols.concat(symbols)
        this.li = document.createElement('li')
        this.li.classList.add('slot_m')
        const slot1 = document.createElement('div')
        const slot2 = document.createElement('div')
        const slot3 = document.createElement('div')
        const h3 = document.createElement('h3')
        h3.innerText = 'Einsatz: ' + price
        const button = document.createElement('button')
        button.innerText = 'spin'
        button.addEventListener('click', () => {
            if (money >= this.price) {
                money -= this.price
                money += this.spin()
                update_money()
            }
        })
        this.slots = [slot1, slot2, slot3]
        this.p_array = []
        this.slots.forEach(slot => {
            const p = document.createElement('p')
            const p2 = document.createElement('p')
            p.innerText = '#'
            p2.innerText = '#'
            slot.appendChild(p)
            let p_array = []
            shuffle(this.symbols)
            this.symbols.forEach(symbol => {
                const p = document.createElement('p')
                p.innerText = symbol
                slot.appendChild(p)
                p_array.push(p)
            })
            slot.appendChild(p2)
            this.p_array.push(p_array)
        })
        this.li.appendChild(h3)
        this.li.appendChild(slot1)
        this.li.appendChild(slot2)
        this.li.appendChild(slot3)
        this.li.appendChild(button)

        window.addEventListener('load', () => {
            this.spin(false)
        })
        
        return this.li
    }

    spin(account_for_money = true) {
        let results = []
        //let index = 0
        this.p_array.forEach(slot => {
            const result = slot[Math.floor(Math.random() * (slot.length - 1))]
            result.scrollIntoView()
            results.push(result.innerText)
/* 
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        update_money()
                        observer.disconnect();
                    }
                });
            }, { root: this.slots[index], threshold: 0.1 });
            observer.observe(result);

            index ++ */
        })

        if (account_for_money) {
            const slot1 = results[0]
            const slot2 = results[1]
            const slot3 = results[2]
            if (slot1 == slot2) {
                if (slot1 == slot3) {                                   
                    konfetti_corners()
                    return 4*this.price // Alle 3 sind gleich.
                }
                return this.price // 1 & 2 sind gleich.
            } else if (slot1 == slot3) {
                return this.price // 1 & 3 sind gleich.
            } else if (slot2 == slot3) {
                return this.price // 2 & 3 sind gleich.
            } else {
                return 0 // alle sind unterschiedlich.
            }
        }
    }
}

document.getElementById('slot_ms_ul').prepend(new Slot_ms(1000, symbols6))
document.getElementById('slot_ms_ul').prepend(new Slot_ms(500, symbols5))
document.getElementById('slot_ms_ul').prepend(new Slot_ms(250, symbols4))
document.getElementById('slot_ms_ul').prepend(new Slot_ms(100, symbols3))
document.getElementById('slot_ms_ul').prepend(new Slot_ms(50, symbols2))
document.getElementById('slot_ms_ul').prepend(new Slot_ms(10, symbols1))