var context = new AudioContext();
var convolver = context.createConvolver();
var dry = context.createGain();
var wet = context.createGain();
var compressor = context.createDynamicsCompressor();
var trebleVolume = context.createGain();
dry.gain.value = 0.8;
wet.gain.value = 0.7 * dry.gain.value;
trebleVolume.gain.value = 1.0;

compressor.connect(trebleVolume);
trebleVolume.connect(dry);
trebleVolume.connect(convolver);
convolver.connect(wet);
dry.connect(context.destination);
wet.connect(context.destination);
