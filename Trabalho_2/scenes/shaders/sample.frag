#ifdef GL_ES
  precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;
uniform vec2 resolution;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  if(mod(vTextureCoord.y * 10.0-timeFactor, 2.0) > 1.0)
      color = vec4(color.rgb*0.5,1);//color = vec4(1,1,1,1.0);

  gl_FragColor = color;
}