//synth vars
var buffers = [];
var bufferLoopLengths = [1.8768707482993197, 1.6600680272108843, 1.552857142857143, 1.3194557823129252, 1.4354875283446713, 1.3715873015873017, 1.553424036281179, 1.3344897959183672, 1.1317006802721088, 1.100748299319728, 1.313424036281179, 1.5568480725623584, 1.669342403628118, 1.528344671201814, 1.7375056689342403, 1.9900907029478458, 1.5558049886621315, 1.6732879818594104, 1.4573015873015873, 1.1686167800453515, 1.443718820861678, 1.2028571428571428, 1.127596371882086, 1.0715192743764173, 0.9723356009070295, 0.8282312925170068, 0.7995238095238095, 0.6944444444444444, 0.6875510204081633, 0.6339909297052154, 0.866077097505669, 0.7631065759637188, 1.1886621315192745, 0.8000680272108843, 0.8858956916099773, 0.689297052154195, 0.89140589569161, 0.7921541950113379, 0.631859410430839, 0.686984126984127, 0.8283900226757369, 0.5869841269841269, 0.6749433106575964, 0.996281179138322, 1.1890249433106577, 1.5476190476190477, 1.2124489795918367, 1.2090702947845804, 1.1925396825396826, 1.1466666666666667, 1.0549433106575963, 1.5938775510204082, 1.1829931972789116, 1.2900226757369615, 1.3817460317460317, 1.1428571428571428, 0.8370748299319728, 1.395124716553288, 1.215487528344671, 1.6129931972789116, 1.1696145124716553, 1.0778684807256236, 0.8466213151927438, 0.9326303854875283, 1.2938321995464852, 1.2670748299319727, 1.2517913832199548, 0.9307256235827664, 0.8867573696145125, 0.4930612244897959, 0.7644444444444445, 0.8829478458049886, 0.8561904761904762, 0.902063492063492, 0.9937868480725623, 1.0549433106575963, 1.1466666666666667, 1.0396598639455783, 1.1160997732426303, 1.0243537414965986, 0.8714739229024944, 1.0090702947845804, 1.0549433106575963, 1.2995691609977325, 0.8867573696145125, 1.0396598639455783] ;
var pitch = 29;

//web audio vars

var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();
var compressorEnd = context.createDynamicsCompressor();
var trebleVolume = context.createGain();
var biquadFilter = context.createBiquadFilter();
var audioGains = [];
var notesOnWaiting = [];
var notesOffWaiting = [];
var noteOnArr = [];
dry.gain.value = 3;
wet.gain.value = 1.5*dry.gain.value;
trebleVolume.gain.value = 1.0;


compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.25;

biquadFilter.type = "highpass";
biquadFilter.frequency.value = 0;
compressor.connect(trebleVolume);
trebleVolume.connect(dry);
trebleVolume.connect(convolver);
convolver.connect(wet);
dry.connect(compressorEnd);
wet.connect(compressorEnd);
compressorEnd.connect(biquadFilter);
biquadFilter.connect(context.destination);



// var loopLengths = [];
// getLoopLength(24) ;
// function getLoopLength ( index ) {
//     if ( index === 110 )
//         return ;
//     var loopRequest = new XMLHttpRequest() ;
//     loopRequest.open('GET', "/data/treble/" + index + "l.wav", true);
//     loopRequest.responseType = 'arraybuffer';
//     loopRequest.onload = function() {
//         context.decodeAudioData(loopRequest.response, function(buffer) {
//             loopLengths.push(buffer.duration);
//             console.log(loopLengths);
//             getLoopLength (index+1) ;
//         });
//     };
//     loopRequest.send();
// }


var notesRequest = new XMLHttpRequest();
notesRequest.open('GET', "/data/hq_fast_treble.mp3", true);
notesRequest.responseType = 'arraybuffer';
notesRequest.onload = function() {
    processConcatenatedFile(notesRequest.response);
};
var convolverRequest = new XMLHttpRequest();
convolverRequest.open('GET', "/data/16_IR_Pool_Size_00.wav", true);
convolverRequest.responseType = 'arraybuffer';
convolverRequest.onload = function() {
    context.decodeAudioData(convolverRequest.response, function(buffer) {
        convolver.buffer = buffer;
        // convolver.normalize = true ;
        notesRequest.send();
    });
};
convolverRequest.send();

function processNotes(buffer) {
    this.context.decodeAudioData(buffer, function(res) {
        var source = this.context.createBufferSource();
        var sourceGain = this.context.createGain();
        source.buffer = res;
        source.connect(sourceGain);
        source.loop = true;
        sourceGain.connect(this.compressor);
        sourceGain.gain.value = 0;
        source.start();
        this.audioGains.push(sourceGain);
        this.notesOnWaiting.push(0);
        this.notesOffWaiting.push(0);
        this.noteOnArr.push(0);
    });
}

function processConcatenatedFile(data) {
    var bb = new DataView(data);
    var offset = 0;
    while (offset < bb.byteLength) {
        var length = bb.getUint32(offset, true);
        offset += 4;
        var sound = this.extractBuffer(data, offset, length);
        offset += length;
        context.decodeAudioData(sound.buffer, function(res) {
            buffers.push(res);
        });
    }
}

function extractBuffer(src, offset, length) {
    var dstU8 = new Uint8Array(length);
    var srcU8 = new Uint8Array(src, offset, length);
    dstU8.set(srcU8);
    return dstU8;
}

function updateVelocity(velocity) {
    this.trebleVolume.gain.value = (velocity / 127);
}

function allNotesOffChords() {
    for (var i = 0; i < this.audioGains.length; i++) {
        this.audioGains[i].gain.value = 0.0;
        this.notesOffWaiting[i] = 0;
        this.notesOnWaiting[i] = 0;
        this.noteOnArr[i] = 0;
    }
}

//accordion vars

//note position in buffers array
// var gAccordion = [22, 20, 7, 11, 12, 14, 16, 17, 19, 21, 24, 23, 28, 26, 31, 29, 36, 33, 40, 35, 13, 15, 2, 6, 7, 9, 11, 12, 14, 16, 19, 18, 23, 21, 26, 24, 31, 28, 35, 30, 38, 33, 8, 10, 2, 4, 6, 7, 9, 11, 14, 13, 18, 16, 21, 19, 26, 23, 30, 25, 33, 28];
//
// var res = "";
// for (var i = 0; i < gAccordion.length; i++) {
//     res += (gAccordion[i] - 29) + ", ";
// }
// console.log(res);
// var gAccordionBass = [55, 50, 48, 55, 53, 48, 52, 57, 57, 50,
// 58, 58
// ];
// var gAccordionBass = [116, 111, 109, 116, 114, 109, 113, 118, 118, 111, 119, 119];


// var res = "";
// for (var i = 0; i < gAccordionBass.length; i++) {
//     res += (gAccordionBass[i] - 48 + 69) + ", ";
// }
// console.log(res);

var marked = [];
var noteCnt = 0;
var bassNotesPlayed = [];
var newName = [];

function sortNumber(a, b) {
    return a - b;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}
