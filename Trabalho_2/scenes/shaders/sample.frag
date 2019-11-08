#ifdef GL_ES
  precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;
uniform vec4 selColor;

void main() {
  gl_FragColor = vec4(selColor.rgb,1);
  //if(mod(vTextureCoord.y * 10.0, 2.0) > 1.0)color = vec4(color.rgb*0.5,1.0);fragColor = vec4(color.rgb, 1.0);
}