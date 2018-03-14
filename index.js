const recordBtn = $('#start-record');
let recording = false;

let base64String = '';

let audioLength, audioDuration, sampleRate, numChan;

recordBtn.on('mousedown mouseup touchstart touchend',function(e){
  if ( !(e.type == 'mousedown' && e.button !=0) ){
    recording = !recording;
    console.log(recording);
    if (recording == false) {
      post_text();
    }
  }
});

function post_text() {
  $.post("http://localhost:8080",
  JSON.stringify({
    "sound": base64String,
    "audioLength": audioLength,
    "audioDuration": audioDuration,
    "sampleRate": sampleRate,
    "numChan": numChan
  }),
  function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
  });
}

function Base64Encode(str, encoding = 'utf-8') {
  var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);        
  return base64js.fromByteArray(bytes);
}

var handleSuccess = function(stream) {
  var context = new AudioContext();
  var source = context.createMediaStreamSource(stream); 
  var processor = context.createScriptProcessor(16384, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = function(e) {
    if (recording) {
      console.log(e.inputBuffer);
      base64String = Base64Encode(e.inputBuffer.getChannelData(0));
      audioLength = e.inputBuffer.length;
      audioDuration = e.inputBuffer.duration;
      sampleRate = e.inputBuffer.sampleRate;
      numChan = e.inputBuffer.numberOfChannels;
      //console.log(base64String);
    }
  };
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);

