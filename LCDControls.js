document.getElementsByTagName("body")[0].addEventListener("click", closeSides)

function openSettings(event) {
    closeInputText();
    if (document.getElementById("LCDControls").style.width == "400px") {
        closeSettings()
        return
    }
    document.getElementById("LCDControls").style.left = "0px"
    document.getElementById("settingsBtn").style.left = "400px"
    document.getElementById("settingsBtn").children[0].style.transform = "rotate(-180deg)"
    document.getElementById("settingsBtn").style.opacity = "0"
    event.stopPropagation()
}

function closeSettings() {
    document.getElementById("LCDControls").style.left = "-400px"
    document.getElementById("settingsBtn").style.left = "0px"
    document.getElementById("settingsBtn").children[0].style.transform = "rotate(0deg)"
    document.getElementById("settingsBtn").style.opacity = ""
}
function openOutput(event) {
    closeInputText();
    hideCharMenu()
    document.getElementById("charOutput").style.right = "0px"
    document.getElementById("outputBtn").style.right = "400px"
    document.getElementById("outputBtn").style.opacity = "0"
    if (event) event.stopPropagation()
}
function closeOutput() {
    document.getElementById("charOutput").style.right = "-400px"
    document.getElementById("outputBtn").style.right = "0px"
    document.getElementById("outputBtn").style.opacity = ""
}

function closeSides() {
    closeSettings();
    closeOutput();
}


const sizes = [
    "8x1", "8x2",
    "16x1", "16x2", "16x4",
    "20x1", "20x2", "20x4",
    "24x2",
    "40x1", "40x2", "40x4"
]
const widths = {
    "8x1": { min: 50, max: 100, default: 50 },
    "8x2": { min: 50, max: 70, default: 50 },
    "16x1": { min: 60, max: 100, default: 80 },
    "16x2": { min: 60, max: 100, default: 80 },
    "16x4": { min: 60, max: 80, default: 70 },
    "20x1": { min: 50, max: 100, default: 95 },
    "20x2": { min: 50, max: 100, default: 95 },
    "20x4": { min: 50, max: 100, default: 95 },
    "24x2": { min: 50, max: 100, default: 95 },
    "40x1": { min: 100, max: 100, default: 100 },
    "40x2": { min: 100, max: 100, default: 100 },
    "40x4": { min: 100, max: 100, default: 100 },
}
function changeSize(value) {
    document.getElementById("sizeValue").innerText = sizes[value]
    lcd.begin(sizes[value].substring(0, sizes[value].indexOf('x')), sizes[value].substring(sizes[value].indexOf('x') + 1))

    if (lcd.width < widths[lcd.size].min) {
        document.getElementById("LCDWidth").value = widths[lcd.size].min
    } else if (lcd.width > widths[lcd.size].max) {
        document.getElementById("LCDWidth").value = widths[lcd.size].max
    }
    changeWidth(document.getElementById("LCDWidth").value)
}

function changeWidth(value) {
    if (value < widths[lcd.size].min) {
        document.getElementById("LCDWidth").value = widths[lcd.size].min
        document.getElementById("widthValue").innerText = widths[lcd.size].min + "%"
        errorBeep();
        return
    }
    else if (value > widths[lcd.size].max) {
        document.getElementById("LCDWidth").value = widths[lcd.size].max
        document.getElementById("widthValue").innerText = widths[lcd.size].max + "%"
        errorBeep();
        return
    }
    lcd.width = value
    document.getElementById("widthValue").innerText = value + "%"
    document.getElementById("lcd_frame").style = `width: ${value}%;`

    lcd.style.gap = `${(160 / lcd.col) * value / 100}px`
    lcd.style.padding = `${value / 5}px`

    changeStyleContents("pixel-gap", `.pixelGrid { gap: ${(40 / lcd.col) * (value / 100)}px; }`)
}
function changeColor(color) {
    if (color == 'yellow') {
        lcd.color = color
        changeStyleContents("pixel-on-hover", `.pixel-on:hover {background-color: rgb(0, 0, 0, 0.4);}`)
        changeStyleContents("pixel-off-hover", `.pixel-off:hover {background-color: rgb(0, 0, 0, 0.8);}`)
    } else if (color == 'blue') {
        lcd.color = color
        changeStyleContents("pixel-on-hover", `.pixel-on:hover {background-color: rgb(255, 255, 255, 0.4);}`)
        changeStyleContents("pixel-off-hover", `.pixel-off:hover {background-color: rgb(255, 255, 255, 0.8);}`)
    }
}
function menuAction(event) {
    updateURI()
    event.stopPropagation()
}