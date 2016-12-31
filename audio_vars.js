var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();
dry.gain.value = 0.8;
wet.gain.value = 0.8 * dry.gain.value;

compressor.connect(dry);
compressor.connect(convolver);
convolver.connect(wet);
dry.connect(context.destination);
wet.connect(context.destination);
