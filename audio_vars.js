var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();
var synthReverb=40 ;
wet.gain.value = ( 1.0 - ((100-synthReverb)/100) );
dry.gain.value = (100-synthReverb)/100;

// dry.gain.value = 0.8;
// wet.gain.value = 0.8 * dry.gain.value;

var convolverRequest = new XMLHttpRequest();
convolverRequest.open('GET',"/data/16_IR_Pool_Size_00.wav", true);
convolverRequest.responseType = 'arraybuffer';
convolverRequest.onload = function () {
    context.decodeAudioData(convolverRequest.response, function (buffer) {
        convolver.buffer = buffer;
    });
};
convolverRequest.send();


compressor.connect(dry);
compressor.connect(convolver);
convolver.connect(wet);
dry.connect(context.destination);
wet.connect(context.destination);
