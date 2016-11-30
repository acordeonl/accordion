var gAccordion = [ 51, 49, 36, 40, 41, 43, 45, 46, 48, 50, 53, 52,
        57, 55, 60, 58, 65, 62, 69, 64, 42, 44, 31, 35, 36, 38, 40, 41, 43,
        45, 48, 47, 52, 50, 55, 53, 60, 57, 64, 59, 67, 62, 37, 39, 31, 33,
        35, 36, 38, 40, 43, 42, 47, 45, 50, 48, 55, 52, 59, 54, 62, 57 ] ;
var gAccordionBass = [55, 50, 48, 55, 53, 48, 52, 57, 57, 50,
        58, 58] ;
var marked = [] ;
var noteCnt = 0 ;
var bassNotesPlayed = [] ;
var newName = [] ;
function sortNumber(a,b) {
    return a - b;
}
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
