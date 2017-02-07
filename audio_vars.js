var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();

compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.25;


var synthReverb=40 ;
wet.gain.value = ( 1.0 - ((100-synthReverb)/100) );
dry.gain.value = (100-synthReverb)/100;

var convolverRequest = new XMLHttpRequest();
convolverRequest.open('GET',"/data/16_IR_Pool_Size_00.wav", true);
convolverRequest.responseType = 'arraybuffer';
convolverRequest.onload = function () {
    context.decodeAudioData(convolverRequest.response, function (buffer) {
        convolver.buffer = buffer;
    });
};
convolverRequest.send();

convolver.connect(wet);
dry.connect(compressor);
wet.connect(compressor);
compressor.connect(context.destination) ;



// // Assume entire sound output is being piped through the mix node.
// var meter = context.createScriptProcessor(2048, 1, 1);
// meter.onaudioprocess = processAudio;
//
//
// function processAudio(e) {
//   var buffer = e.inputBuffer.getChannelData(0);
//
//   var isClipping = false;
//   // Iterate through buffer to check if any of the |values| exceeds 1.
//   for (var i = 0; i < buffer.length; i++) {
//     var absValue = Math.abs(buffer[i]);
//     if (absValue >= 1) {
//       isClipping = true;
//       console.log('barro barro con el audio');
//       break;
//     }
//   }
// }
//
// compressor.connect(meter) ;
// meter.connect(context.destination);
