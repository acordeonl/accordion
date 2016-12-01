//web audio vars

var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();
var compressorEnd = context.createDynamicsCompressor();
var trebleVolume = context.createGain();
var biquadFilter = context.createBiquadFilter();
var buffers = [];
var audioGains = [];
var notesOnWaiting = [];
var notesOffWaiting = [];
var noteOnArr = [];
var pitch = 24;
dry.gain.value = 0.5;
wet.gain.value = 1;
trebleVolume.gain.value = 0.0;


compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.25;

biquadFilter.type = "lowpass";
biquadFilter.frequency.value = 7000;
compressor.connect(trebleVolume);
trebleVolume.connect(dry);
trebleVolume.connect(convolver);
convolver.connect(wet);
dry.connect(compressorEnd);
wet.connect(compressorEnd);
compressorEnd.connect(biquadFilter);
biquadFilter.connect(context.destination);
var notesRequest = new XMLHttpRequest();
notesRequest.open('GET', "/data/accordion_synth.mp3", true);
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
