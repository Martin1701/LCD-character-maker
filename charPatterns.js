const charPatterns = {
    ' ': `00000000
00000000
00000000
00000000
00000000
00000000
00000000
00000000`,
    '!': `00000100
00000100
00000100
00000100
00000000
00000000
00000100
00000000`,
    '"': `00001010
00001010
00001010
00000000
00000000
00000000
00000000
00000000`,
    '#': `00001010
00001010
00011111
00001010
00011111
00001010
00001010
00000000`,
    '$': `00000100
00001111
00010100
00001110
00000101
00011110
00000100
00000000`,
    '%': `00011000
00011001
00000010
00000100
00001000
00010011
00000011
00000000`,
    '&': `00001100
00010010
00010100
00001000
00010101
00010010
00001101
00000000`,
    "'": `00001100
00000100
00001000
00000000
00000000
00000000
00000000
00000000`,
    '(': `00000010
00000100
00001000
00001000
00001000
00000100
00000010
00000000`,
    ')': `00001000
00000100
00000010
00000010
00000010
00000100
00001000
00000000`,
    '*': `00000000
00000100
00010101
00001110
00010101
00000100
00000000
00000000`,
    '+': `00000000
00000100
00000100
00011111
00000100
00000100
00000000
00000000`,
    ',': `00000000
00000000
00000000
00000000
00001100
00000100
00001000
00000000`,
    '-': `00000000
00000000
00000000
00011111
00000000
00000000
00000000
00000000`,
    '.': `00000000
00000000
00000000
00000000
00000000
00001100
00001100
00000000`,
    '/': `00000000
00000001
00000010
00000100
00001000
00010000
00000000
00000000`,
    '0': `00001110
00010001
00010011
00010101
00011001
00010001
00001110
00000000`,
    '1': `00000100
00001100
00000100
00000100
00000100
00000100
00001110
00000000`,
    '2': `00001110
00010001
00000001
00000010
00000100
00001000
00011111
00000000`,
    '3': `00011111
00000010
00000100
00000010
00000001
00010001
00001110
00000000`,
    '4': `00000010
00000110
00001010
00010010
00011111
00000010
00000010
00000000`,
    '5': `00011111
00010000
00011110
00000001
00000001
00010001
00001110
00000000`,
    '6': `00000110
00001000
00010000
00011110
00010001
00010001
00001110
00000000`,
    '7': `00011111
00010001
00000001
00000010
00000100
00000100
00000100
00000000`,
    '8': `00001110
00010001
00010001
00001110
00010001
00010001
00001110
00000000`,
    '9': `00001110
00010001
00010001
00001111
00000001
00000010
00001100
00000000`,
    ':': `00000000
00001100
00001100
00000000
00001100
00001100
00000000
00000000`,
    ';': `00000000
00001100
00001100
00000000
00001100
00000100
00001000
00000000`,
    '<': `00000010
00000100
00001000
00010000
00001000
00000100
00000010
00000000`,
    '=': `00000000
00000000
00011111
00000000
00011111
00000000
00000000
00000000`,
    '>': `00001000
00000100
00000010
00000001
00000010
00000100
00001000
00000000`,
    '?': `00001110
00010001
00000001
00000010
00000100
00000000
00000100
00000000`,
    '@': `00001110
00010001
00000001
00001101
00010101
00010101
00001110
00000000`,
    'A': `00001110
00010001
00010001
00010001
00011111
00010001
00010001
00000000`,
    'B': `00011110
00010001
00010001
00011110
00010001
00010001
00011110
00000000`,
    'C': `00001110
00010001
00010000
00010000
00010000
00010001
00001110
00000000`,
    'D': `00011100
00010010
00010001
00010001
00010001
00010010
00011100
00000000`,
    'E': `00011111
00010000
00010000
00011110
00010000
00010000
00011111
00000000`,
    'F': `00011111
00010000
00010000
00011110
00010000
00010000
00010000
00000000`,
    'G': `00001110
00010001
00010000
00010111
00010001
00010001
00001110
00000000`,
    'H': `00010001
00010001
00010001
00011111
00010001
00010001
00010001
00000000`,
    'I': `00001110
00000100
00000100
00000100
00000100
00000100
00001110
00000000`,
    'J': `00000111
00000010
00000010
00000010
00000010
00010010
00001100
00000000`,
    'K': `00010001
00010010
00010100
00011000
00010100
00010010
00010001
00000000`,
    'L': `00010000
00010000
00010000
00010000
00010000
00010000
00011111
00000000`,
    'M': `00010001
00011011
00010101
00010101
00010001
00010001
00010001
00000000`,
    'N': `00010001
00010001
00011001
00010101
00010011
00010001
00010001
00000000`,
    'O': `00001110
00010001
00010001
00010001
00010001
00010001
00001110
00000000`,
    'P': `00011110
00010001
00010001
00011110
00010000
00010000
00010000
00000000`,
    'Q': `00001110
00010001
00010001
00010001
00010101
00010010
00001101
00000000`,
    'R': `00011110
00010001
00010001
00011110
00010100
00010010
00010001
00000000`,
    'S': `00001111
00010000
00010000
00001110
00000001
00000001
00011110
00000000`,
    'T': `00011111
00000100
00000100
00000100
00000100
00000100
00000100
00000000`,
    'U': `00010001
00010001
00010001
00010001
00010001
00010001
00001110
00000000`,
    'V': `00010001
00010001
00010001
00010001
00010001
00001010
00000100
00000000`,
    'W': `00010001
00010001
00010001
00010101
00010101
00010101
00001010
00000000`,
    'X': `00010001
00010001
00001010
00000100
00001010
00010001
00010001
00000000`,
    'Y': `00010001
00010001
00010001
00001010
00000100
00000100
00000100
00000000`,
    'Z': `00011111
00000001
00000010
00000100
00001000
00010000
00011111
00000000`,
    '[': `00011100
00010000
00010000
00010000
00010000
00010000
00011100
00000000`,
    '¥': `00010001
00001010
00011111
00000100
00011111
00000100
00000100
00000000`,
    ']': `00001110
00000010
00000010
00000010
00000010
00000010
00001110
00000000`,
    '^': `00000100
00001010
00010001
00000000
00000000
00000000
00000000
00000000`,
    '_': `00000000
00000000
00000000
00000000
00000000
00000000
00011111
00000000`,
    '`': `00001000
00000100
00000010
00000000
00000000
00000000
00000000
00000000`,
    'a': `00000000
00000000
00001110
00000001
00001111
00010001
00001111
00000000`,
    'b': `00010000
00010000
00010110
00011001
00010001
00010001
00011110
00000000`,
    'c': `00000000
00000000
00001110
00010000
00010000
00010001
00001110
00000000`,
    'd': `00000001
00000001
00001101
00010011
00010001
00010001
00001111
00000000`,
    'e': `00000000
00000000
00001110
00010001
00011111
00010000
00001110
00000000`,
    'f': `00000110
00001001
00001000
00011100
00001000
00001000
00001000
00000000`,
    'g': `00000000
00001111
00010001
00010001
00001111
00000001
00001110
00000000`,
    'h': `00010000
00010000
00010110
00011001
00010001
00010001
00010001
00000000`,
    'i': `00000100
00000000
00001100
00000100
00000100
00000100
00001110
00000000`,
    'j': `00000010
00000000
00000110
00000010
00000010
00010010
00001100
00000000`,
    'k': `00010000
00010000
00010010
00010100
00011000
00010100
00010010
00000000`,
    'l': `00001100
00000100
00000100
00000100
00000100
00000100
00001110
00000000`,
    'm': `00000000
00000000
00011010
00010101
00010101
00010001
00010001
00000000`,
    'n': `00000000
00000000
00010110
00011001
00010001
00010001
00010001
00000000`,
    'o': `00000000
00000000
00001110
00010001
00010001
00010001
00001110
00000000`,
    'p': `00000000
00000000
00011110
00010001
00011110
00010000
00010000
00000000`,
    'q': `00000000
00000000
00001101
00010011
00001111
00000001
00000001
00000000`,
    'r': `00000000
00010110
00011001
00010000
00010000
00010000
00010000
00000000`,
    's': `00000000
00000000
00001110
00010000
00001110
00000001
00011110
00000000`,
    't': `00001000
00001000
00011100
00001000
00001000
00001001
00000110
00000000`,
    'u': `00000000
00000000
00010001
00010001
00010001
00010011
00001101
00000000`,
    'v': `00000000
00000000
00010001
00010001
00010001
00001010
00000100
00000000`,
    'w': `00000000
00000000
00010001
00010101
00010101
00010101
00001010
00000000`,
    'x': `00000000
00000000
00010001
00001010
00000100
00001010
00010001
00000000`,
    'y': `00000000
00000000
00010001
00010001
00001111
00000001
00001110
00000000`,
    'z': `00000000
00000000
00011111
00000010
00000100
00001000
00011111
00000000`,
    '{': `00000010
00000100
00000100
00001000
00000100
00000100
00000010
00000000`,
    '|': `00000100
00000100
00000100
00000100
00000100
00000100
00000100
00000000`,
    '}': `00001000
00000100
00000100
00000010
00000100
00000100
00001000
00000000`,
    'cursor': `00000000
00000000
00000000
00000000
00000000
00000000
00000000
00011111`
}