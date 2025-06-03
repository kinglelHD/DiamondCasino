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
                if (slot1 == slot3) {                                         // Gewinnüberprüfungen.
                    console.log("\nDu gewinnst \(4*this.price) Chips.")
                    return 4*this.price // Alle 3 sind gleich.
                }
                console.log("\nDu gewinnst \(this.price) Chips.")
                return this.price // 1 & 2 sind gleich.
            } else if (slot1 == slot3) {
                console.log("\nDu gewinnst \(this.price) Chips.")
                return this.price // 1 & 3 sind gleich.
            } else if (slot2 == slot3) {
                console.log("\nDu gewinnst \(this.price) Chips.")
                return this.price // 2 & 3 sind gleich.
            } else {
                console.log("\nDu gewinnst nichts.")
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