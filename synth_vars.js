var noteNotFound = false ;

//bass_chords pitch change
var bassChordsNextNote = [] ;
var bassChordspreviousNote = [] ;
bassChordsNextNote[0] = 4 ;
bassChordspreviousNote[0] = 35 ;
bassChordsNextNote[1] = 5 ;
bassChordspreviousNote[1] = 35 ;
bassChordsNextNote[2] = 6 ;
bassChordspreviousNote[2] = 36 ;
bassChordsNextNote[3] = 7 ;
bassChordspreviousNote[3] = 37 ;
bassChordsNextNote[4] = 8 ;
bassChordspreviousNote[4] = 0 ;
bassChordsNextNote[5] = 8 ;
bassChordspreviousNote[5] = 1 ;
bassChordsNextNote[6] = 10 ;
bassChordspreviousNote[6] = 2 ;
bassChordsNextNote[7] = 10 ;
bassChordspreviousNote[7] = 3 ;
bassChordsNextNote[8] = 11 ;
bassChordspreviousNote[8] = 5 ;
bassChordsNextNote[9] = 11 ;
bassChordspreviousNote[9] = 5 ;
bassChordsNextNote[10] = 13 ;
bassChordspreviousNote[10] = 6 ;
bassChordsNextNote[11] = 14 ;
bassChordspreviousNote[11] = 9 ;
bassChordsNextNote[12] = 15 ;
bassChordspreviousNote[12] = 8 ;
bassChordsNextNote[13] = 18 ;
bassChordspreviousNote[13] = 10 ;
bassChordsNextNote[14] = 19 ;
bassChordspreviousNote[14] = 11 ;
bassChordsNextNote[15] = 19 ;
bassChordspreviousNote[15] = 12 ;
bassChordsNextNote[16] = 23 ;
bassChordspreviousNote[16] = 38 ;
bassChordsNextNote[17] = 23 ;
bassChordspreviousNote[17] = 39 ;
bassChordsNextNote[18] = 24 ;
bassChordspreviousNote[18] = 13 ;
bassChordsNextNote[19] = 25 ;
bassChordspreviousNote[19] = 15 ;
bassChordsNextNote[20] = 26 ;
bassChordspreviousNote[20] = 14 ;
bassChordsNextNote[21] = 27 ;
bassChordspreviousNote[21] = 40 ;
bassChordsNextNote[22] = 27 ;
bassChordspreviousNote[22] = 41 ;
bassChordsNextNote[23] = 29 ;
bassChordspreviousNote[23] = 16 ;
bassChordsNextNote[24] = 30 ;
bassChordspreviousNote[24] = 18 ;
bassChordsNextNote[25] = 32 ;
bassChordspreviousNote[25] = 19 ;
bassChordsNextNote[26] = 32 ;
bassChordspreviousNote[26] = 20 ;
bassChordsNextNote[27] = 34 ;
bassChordspreviousNote[27] = 22 ;
bassChordsNextNote[28] = 35 ;
bassChordspreviousNote[28] = 21 ;
bassChordsNextNote[29] = 36 ;
bassChordspreviousNote[29] = 23 ;
bassChordsNextNote[30] = 38 ;
bassChordspreviousNote[30] = 24 ;
bassChordsNextNote[31] = 39 ;
bassChordspreviousNote[31] = 24 ;
bassChordsNextNote[32] = 40 ;
bassChordspreviousNote[32] = 26 ;
bassChordsNextNote[33] = 40 ;
bassChordspreviousNote[33] = 26 ;
bassChordsNextNote[34] = 0 ;
bassChordspreviousNote[34] = 27 ;
bassChordsNextNote[35] = 0 ;
bassChordspreviousNote[35] = 28 ;
bassChordsNextNote[36] = 2 ;
bassChordspreviousNote[36] = 29 ;
bassChordsNextNote[37] = 3 ;
bassChordspreviousNote[37] = 29 ;
bassChordsNextNote[38] = 16 ;
bassChordspreviousNote[38] = 30 ;
bassChordsNextNote[39] = 17 ;
bassChordspreviousNote[39] = 31 ;
bassChordsNextNote[40] = 21 ;
bassChordspreviousNote[40] = 33 ;
bassChordsNextNote[41] = 22 ;
bassChordspreviousNote[41] = 32 ;

//keyboad actions
var keyMap = [] ;
keyMap['w'] = 24 ;
keyMap['e'] = 26 ;
keyMap['r'] = 28 ;
keyMap['t'] = 30 ;
keyMap['y'] = 32 ;
keyMap['u'] = 34 ;
keyMap['i'] = 36 ;
keyMap['o'] = 38 ;
keyMap['p'] = 40 ;
keyMap['['] = 42 ;
keyMap['a'] = 44 ;
keyMap['s'] = 46 ;
keyMap['d'] = 48 ;
keyMap['f'] = 50 ;
keyMap['g'] = 52 ;
keyMap['h'] = 54 ;
keyMap['j'] = 56 ;
keyMap['k'] = 58 ;
keyMap['l'] = 60 ;
keyMap[';'] = 62 ;
keyMap['0'] = 64 ;
keyMap['z'] = 66 ;
keyMap['x'] = 68 ;
keyMap['c'] = 70 ;
keyMap['v'] = 72 ;
keyMap['b'] = 74 ;
keyMap['n'] = 76 ;
keyMap['m'] = 78 ;
keyMap[','] = 80 ;
keyMap['.'] = 82 ;
keyMap['/'] = 84 ;
