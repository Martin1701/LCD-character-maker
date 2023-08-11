const charMenuElem = document.getElementById("charMenu")

const charMenuOffsetL = 5 // px
const charMenuOffsetB = 50 // px

document.getElementsByTagName("body")[0].addEventListener("click", hideCharMenu)
document.getElementsByTagName("body")[0].addEventListener("click", closeInputText)

class pixel_tag extends HTMLElement {
    constructor() {
        super()
    }
    setOn() {
        this.classList.add("pixel-on")
        this.classList.remove("pixel-off")
    }
    setOff() {
        this.classList.add("pixel-off")
        this.classList.remove("pixel-on")
    }
    invert() {
        if (this.classList.contains("pixel-on")) {
            this.setOff()
        } else {
            this.setOn()
        }
    }
}
class lcd_tag extends HTMLElement {
    #params;
    constructor() {
        super()

        this.#params = {
            row: undefined,
            col: undefined,
            size: undefined,
            color: undefined,
            brightness: undefined,
            contrast: undefined,
            width: undefined
        }
        this.char = {
            current: undefined,
            invert(char) {
                if (!char) char = this.current
                for (let i = 0; i < char.children.length; i++) {
                    char.children[i].invert()
                }
            },
            clear(char) {
                if (!char) char = this.current
                let pixels = char.children
                for (let i = 0; i < pixels.length; i++) {
                    pixels[i].setOff()
                }
            },
            write(char) {
                if (!char) char = this.current
            },
            index(char) {
                if (!char) char = this.current
                return Array.prototype.indexOf.call(char.parentNode.children, char);
            },
            position(char) {
                if (!char) char = this.current
                let i = this.index(char)
                let row = Math.trunc(i / 16)
                let col = i - (16 * row)
                return [row, col]
            }
        }
    }
    get row() {
        return this.#params.row
    }
    set row(r) {
        throw new Error("can't set the parameter, use .begin() instead");
    }
    get col() {
        return this.#params.col
    }
    set col(r) {
        throw new Error("can't set the parameter, use .begin() instead");
    }
    get size() {
        return this.#params.size
    }
    set size(r) {
        throw new Error("can't set the parameter, use .begin() instead");
    }
    get brightness() {
        return this.#params.brightness
    }
    set brightness(b) {
        this.#params.brightness = b
        let pixels = document.getElementsByTagName('lcd-pixel')
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].style["opacity"] = b / 100
        }
        if (this.color == 'blue') {
            changeStyleContents("pixel-on-Color", `.pixel-on { background-color: rgba(255, 255, 255, 0.8); }`)
        } else {
            changeStyleContents("pixel-on-Color", `.pixel-on { background-color: rgba(0, 0, 0, 0.8); }`)
        }
    }
    get contrast() {
        return this.#params.contrast
    }
    set contrast(c) {
        this.#params.contrast = c
        // needs to be inverted due to way this is done
        c = Math.abs(c - 100) / 100
        if (this.color == 'blue') {
            changeStyleContents("pixel-off-Color", `.pixel-off { background-color: rgba(255, 255, 255, ${c}); }`)
        } else {
            changeStyleContents("pixel-off-Color", `.pixel-off { background-color: rgba(0, 0, 0, ${c}); }`)
        }
    }
    get width() {
        return this.#params.width
    }
    set width(w) {
        this.#params.width = w
    }
    get color() {
        return this.#params.color
    }
    set color(c) {
        if (c == 'yellow') {
            if (this.color == 'yellow') return
            this.#params.color = c
            this.classList.remove("lcd-blue")
            this.classList.add("lcd-yellow")
            this.brightness = this.brightness
            this.contrast = this.contrast
        } else if (this.color != 'blue') {
            // default to blue
            this.#params.color = c
            this.classList.add("lcd-blue")
            this.classList.remove("lcd-yellow")
            this.brightness = this.brightness
            this.contrast = this.contrast
        }
    }
    begin(col, row) {
        if (this.row == row && this.col == col) return

        this.#params.size = `${col}x${row}`
        this.#params.row = row
        this.#params.col = col
        // styling, sizing, all the broken stuff
        this.style.gridTemplateColumns = `repeat(${this.col}, 1fr)`
        this.style.gridTemplateRows = `repeat(${this.row}, 1fr)`

        const createPixels = (div) => {
            for (let j = 0; j < 40; j++) {
                div.appendChild(pixel.cloneNode(true))
            }
            return div
        }
        if (this.col * this.row > this.children.length) {
            // we need more children !
            for (let j = this.children.length; j < (this.col * this.row); j++) {
                this.appendChild(createPixels(pixelGrid.cloneNode(true)))
            }
        } else {
            // some children have to be removed
            for (let j = this.children.length; j > (this.col * this.row); j--) {
                this.removeChild(this.lastChild);
            }
        }
        this.char.current = this.children[0]
    }
    clear() {
        lcd.char.current.classList.remove("highlight")
        this.setCursor(this.children[0], false)
        // turn all visible pixels off (kinda efficient yeah)
        while (document.getElementsByClassName("pixel-on").length) {
            document.getElementsByClassName("pixel-on")[0].setOff()
        }
    }
    setCursor(char, show) {
        this.char.current = char
        return
        // not used
        // since cursor pixels can be mapped for custom characters
        // TODO make it work so when user uses these pixels, cursor will obey
        this.noCursor() // turn off previous cursor (if shown)
        this.char.current = char
        if (show) {
            this.cursor()
        }
        else {
            this.noCursor()
        }
    }
    cursor() {
        return // same reason as ^^ above ^^
        const pixelCount = this.char.current.children.length
        for (let i = 0; i < 5; i++) {
            this.char.current.children[pixelCount - i - 1].setOn()
        }
    }
    noCursor() {
        return // same reason as ^^ above ^^
        const pixelCount = this.char.current.children.length
        for (let i = 0; i < 5; i++) {
            this.char.current.children[pixelCount - i - 1].setOff()
        }
    }
    write(data) {
        // moves cursor to next position, returns false if on end of display
        const advanceCursor = () => {
            const index = Array.prototype.indexOf.call(this.children, this.char.current) + 1
            if (index == this.children.length) return false
            this.char.current = this.children[index]
            return true
        }

        for (let j = 0; j < data.length; j++) {
            var pattern
            if (charPatterns[data[j]]) {
                pattern = charPatterns[data[j]]
            } else {
                pattern = charPatterns[' ']
            }
            let stringIndex = -1
            let pixels = this.char.current.children
            for (let i = 0; i < pixels.length; i++) {
                if (i % 5 == 0) {
                    stringIndex += 4
                }
                if (pattern[stringIndex] == '1') {
                    pixels[i].setOn()
                } else {
                    pixels[i].setOff()
                }
                stringIndex++
            }
            if (!advanceCursor()) return
        }
    }
}
customElements.define("lcd-pixel", pixel_tag)
let pixel = document.createElement("lcd-pixel")
pixel.classList.add('pixel-off')
pixel.setAttribute("onclick", 'invert()')

let pixelGrid = document.createElement("div")
pixelGrid.className = 'pixelGrid'
pixelGrid.setAttribute("oncontextmenu", 'charMenu(event, this)')

customElements.define("lcd-lcd", lcd_tag)
let lcd = document.createElement("lcd-lcd")
document.getElementById("lcd_frame").appendChild(lcd)


// TODO move char menu to LCD class
// it works for now tho
function charMenu(event, char) {
    lcd.char.current.classList.remove("highlight")
    lcd.setCursor(char, true)
    char.classList.add("highlight")
    // position it on left bottom of selected pixel
    charMenuElem.style["top"] = (char.getBoundingClientRect().top + char.clientHeight - charMenuOffsetB) + "px"
    charMenuElem.style["left"] = (char.getBoundingClientRect().left + char.clientWidth + charMenuOffsetL) + "px"

    let [row, col] = lcd.char.position()

    document.getElementById("cursorPosition").innerHTML = `[${col}, ${row}]`
    charMenuElem.style["visibility"] = "visible" // show the menu
    event.preventDefault()
    event.stopPropagation()
}
function hideCharMenu() {
    charMenuElem.style["visibility"] = "hidden"
    lcd.char.current.classList.remove("highlight")
    lcd.noCursor()
}
function char_copyPosition() {
    let [row, col] = lcd.char.position()
    navigator.clipboard.writeText(`${col}, ${row}`)
}

let copyString = ""
function char_copy() {
    let pixels = lcd.char.current.children
    copyString = "000"
    for (let i = 0; i < pixels.length - 5; i++) {
        if ((i % 5 == 0) && i > 0) {
            copyString += "\n000"
        }
        if (pixels[i].classList.contains("pixel-on")) {
            copyString += "1"
        } else {
            copyString += "0"
        }
    }
    navigator.clipboard.writeText(copyString)
    document.getElementById("pasteButton").disabled = false
}
function char_output(event) {
    let pixels = lcd.char.current.children
    let output = "byte customChar[8] = {"
    for (let i = 0; i < pixels.length - 5; i++) {
        if ((i % 5 == 0) || i == 0) {
            if (i < pixels.length - 1 && i != 0) {
                output += ','
            }
            output += "\n\t0b" // first 3 0s not needed
        }
        if (pixels[i].classList.contains("pixel-on")) {
            output += "1"
        } else {
            output += "0"
        }
    }
    output += "\n};"
    document.getElementById("charOutputText").innerHTML = output;
    let [row, col] = lcd.char.position()
    document.getElementById("outputCharCoord").innerHTML = `of character [${col}, ${row}]`

    event.stopPropagation();
    openOutput();
}
function copyCharOutput() {
    navigator.clipboard.writeText(document.getElementById("charOutputText").innerHTML);

    document.getElementById("copyCharBtn").innerText = "Copied !";
    document.getElementById("copyCharBtn").style.backgroundColor = "rgba(0, 0, 0, 0.2)";

    setTimeout(() => {
        document.getElementById("copyCharBtn").innerText = "Copy";
        document.getElementById("copyCharBtn").style.backgroundColor = "";
    }, 2000);
}
// paste work using only variable, not clipboard
// TODO clipboard paste
function char_paste() {
    let pasteString = copyString
    let pixels = lcd.char.current.children
    let stringIndex = -1
    for (let i = 0; i < pixels.length; i++) {
        if (i % 5 == 0) {
            stringIndex += 4
        }
        if (pasteString[stringIndex] == '1') {
            pixels[i].classList.add("pixel-on")
            pixels[i].classList.remove("pixel-off")
        } else {
            pixels[i].classList.add("pixel-off")
            pixels[i].classList.remove("pixel-on")
        }
        stringIndex++
    }
}

function char_write(event) {
    // show input form
    // TODO use some handler, callback, you name it, whatever
    document.getElementById("charInputWrap").style.top = "0px"
    let [row, col] = lcd.char.position()
    document.getElementById("charInputLabel").innerHTML = `write text starting from [${col}, ${row}]:`
    event.stopPropagation()
    hideCharMenu()
}
function writeText(input) {
    lcd.write(input)
    closeInputText()
}

function closeInputText() {
    document.getElementById("charInput").value = ""
    document.getElementById("charInputWrap").style.top = "-200px"
}

