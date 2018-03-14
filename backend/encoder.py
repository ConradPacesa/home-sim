import sys, base64
import wave
import os

def encode(audio_string):
  out_file = './out.wav'
  b = base64.b64decode(audio_string)
  size = sys.getsizeof(b)
  print(size, file=sys.stderr)
  wav_file = wave.open(out_file, 'wb')
  wav_file.setparams((1, 1, 48000.0, size, "NONE", "not compressed"))
  wav_file.writeframes(b)
  wav_file.close()
  

