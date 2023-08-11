const contrastSlider = document.getElementById("contrast");
const brightnessSlider = document.getElementById("brightness");
const baseUrl = location.protocol + '//' + location.host + location.pathname
// create styles used for dynamically changing objects (mostly color)
var style

// pixel-off color
style = document.createElement('style');
style.setAttribute("usage", "pixel-off-Color")
style.innerHTML = `.pixel-off { background-color: rgba(255, 255, 255, ${contrastSlider.value / 100}); }`;
document.getElementsByTagName('head')[0].appendChild(style);

// pixel-on color
style = document.createElement('style');
style.setAttribute("usage", "pixel-on-Color")
style.innerHTML = `.pixel-on { background-color: rgba(255, 255, 255); }`;
document.getElementsByTagName('head')[0].appendChild(style);

// pixel-on hover
style = document.createElement('style');
style.setAttribute("usage", "pixel-on-hover")
style.innerHTML = `.pixel-on:hover {background-color: rgb(255, 255, 255, 0.4);}`;
document.getElementsByTagName('head')[0].appendChild(style);

// pixel-off hover
style = document.createElement('style');
style.setAttribute("usage", "pixel-off-hover")
style.innerHTML = `.pixel-off:hover {background-color: rgb(255, 255, 255, 0.8);}`;
document.getElementsByTagName('head')[0].appendChild(style);

// display background color
style = document.createElement('style');
style.setAttribute("usage", "lcd-color")
style.innerHTML = '#character_grid { background-color: rgb(35, 35, 180); }';
document.getElementsByTagName('head')[0].appendChild(style);

// pixel grid gap
style = document.createElement('style');
style.setAttribute("usage", "pixel-gap")
style.innerHTML = '.pixelGrid { gap: 2px; }';
document.getElementsByTagName('head')[0].appendChild(style);

// used to change things above
function changeStyleContents(usage, styleContents) {
    for (let i = 0; i < document.getElementsByTagName('style').length; i++) {
        if (document.getElementsByTagName('style')[i].getAttribute("usage") == usage) {
            document.getElementsByTagName('style')[i].innerHTML = styleContents
        }
    }
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log()
try {
    if (Object.keys(params).length == 6) {
        setSettings(params.size, params.width, params.brightness, params.contrast, params.color, params.beepEnabled)
    } else {
        restoreDefaults()
    }
} catch {
    restoreDefaults()
}

function updateURI() {
    const encoded = Object.entries({ size: lcd.size, width: lcd.width, brightness: lcd.brightness, contrast: lcd.contrast, color: lcd.color, beepEnabled: beepEnabled, }).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
    window.history.pushState('', '', baseUrl + '?' + encoded)
}
function restoreDefaults() {
    setSettings("16x2", 80, 100, 97, 'blue', false)
    updateURI()
}

function setSettings(size, width, brightness, contrast, color, beepEnabled) {
    // set slider values from parameters
    document.getElementById('LCDSize').value = sizes.indexOf(size)
    brightnessSlider.value = brightness
    contrastSlider.value = contrast
    document.getElementById("LCDWidth").value = width
    // dispatch their respective functions
    document.getElementById('LCDSize').dispatchEvent(new Event("input"))
    brightnessSlider.dispatchEvent(new Event("input"))
    contrastSlider.dispatchEvent(new Event("input"))
    document.getElementById("LCDWidth").dispatchEvent(new Event("input"))

    // radio buttons are a bit different
    if (color == 'yellow') {
        document.getElementById("lcd_color_Y").checked = true
        document.getElementById("lcd_color_Y").dispatchEvent(new Event("click"))
    } else if (color == 'blue') {
        document.getElementById("lcd_color_B").checked = true
        document.getElementById("lcd_color_B").dispatchEvent(new Event("click"))
    }
    if (beepEnabled == true) {
        document.getElementById("beep_on").checked = true
        document.getElementById("beep_on").dispatchEvent(new Event("click"))
    } else {
        document.getElementById("beep_off").checked = true
        document.getElementById("beep_off").dispatchEvent(new Event("click"))
    }
}