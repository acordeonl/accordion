var treble_buffers = [];
var bassN_buffers = [];
var bassC_buffers = [];
var loadTime = 0 ;
var treble_bufferLoopLengths = [1.8768707482993197, 1.6600680272108843, 1.552857142857143, 1.3194557823129252, 1.4354875283446713, 1.3715873015873017, 1.553424036281179, 1.3344897959183672, 1.1317006802721088, 1.100748299319728, 1.313424036281179, 1.5568480725623584, 1.669342403628118, 1.528344671201814, 1.7375056689342403, 1.9900907029478458, 1.5558049886621315, 1.6732879818594104, 1.4573015873015873, 1.1686167800453515, 1.443718820861678, 1.2028571428571428, 1.127596371882086, 1.0715192743764173, 0.9723356009070295, 0.8282312925170068, 0.7995238095238095, 0.6944444444444444, 0.6875510204081633, 0.6339909297052154, 0.866077097505669, 0.7631065759637188, 1.1886621315192745, 0.8000680272108843, 0.8858956916099773, 0.689297052154195, 0.89140589569161, 0.7921541950113379, 0.631859410430839, 0.686984126984127, 0.8283900226757369, 0.5869841269841269, 0.6749433106575964, 0.996281179138322, 1.1890249433106577, 1.5476190476190477, 1.2124489795918367, 1.2090702947845804, 1.1925396825396826, 1.1466666666666667, 1.0549433106575963, 1.5938775510204082, 1.1829931972789116, 1.2900226757369615, 1.3817460317460317, 1.1428571428571428, 0.8370748299319728, 1.395124716553288, 1.215487528344671, 1.6129931972789116, 1.1696145124716553, 1.0778684807256236, 0.8466213151927438, 0.9326303854875283, 1.2938321995464852, 1.2670748299319727, 1.2517913832199548, 0.9307256235827664, 0.8867573696145125, 0.4930612244897959, 0.7644444444444445, 0.8829478458049886, 0.8561904761904762, 0.902063492063492, 0.9937868480725623, 1.0549433106575963, 1.1466666666666667, 1.0396598639455783, 1.1160997732426303, 1.0243537414965986, 0.8714739229024944, 1.0090702947845804, 1.0549433106575963, 1.2995691609977325, 0.8867573696145125, 1.0396598639455783];

var bassN_bufferLoopLengths = [
    2.0487301587301587, 2.3545124716553287, 1.9264172335600906, 2.507392290249433, 2.4309523809523808, 3.027233560090703, 1.4524489795918367, 1.3033786848072562, 1.555668934240363, 2.440521541950113, 1.3148526077097507, 2.599138321995465
];
var bassC_bufferLoopLengths = [
    0.3287074829931973, 0.7491609977324263, 0.7950340136054421, 0.6727210884353741, 0.8409070294784581, 0.902063492063492, 0.5809750566893424, 0.5656916099773243, 0.473968253968254, 0.6574376417233561, 0.596281179138322, 0.596281179138322, 0.596281179138322, 0.6421315192743764, 0.6421315192743764, 0.6421315192743764, 0.7338775510204082, 0.6880045351473922, 0.6421315192743764, 0.6880045351473922, 0.6880045351473922, 0.7338775510204082, 0.6421315192743764, 0.7950340136054421, 0.7950340136054421, 0.8409070294784581, 0.8409070294784581, 0.902063492063492, 0.6880045351473922, 0.6880045351473922, 0.8867573696145125, 0.7491609977324263, 0.6880045351473922, 0.8103174603174603, 0.6574376417233561, 0.7032879818594104, 0.6421315192743764, 0.9326303854875283, 0.902063492063492, 1.0090702947845804, 0.9937868480725623, 0.9937868480725623
];

var treble_startNote = 24;

for (var i = 0; i < 115; i++)
    treble_buffers.push(0);
for (var i = 0; i < 15; i++)
    bassN_buffers.push(0);
for (var i = 0; i < 50; i++)
    bassC_buffers.push(0);

adjustTrebleLoops();

function adjustTrebleLoops() {
    for (var i = 0; i < treble_startNote; i++) {
        treble_bufferLoopLengths.unshift(0);
    }
}
