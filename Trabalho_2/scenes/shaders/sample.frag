#ifdef GL_ES
  precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;
uniform vec2 u_resolution;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  
  //animated white lines
  float offset = sin((vTextureCoord.y - timeFactor)*20.0)*0.5 +1.0;
  color += offset *0.3;

  //radial gradient
  float gradFactor = 0.9 - 1.3*sqrt(pow(vTextureCoord.x-0.5,2.0)+pow(vTextureCoord.y-0.5,2.0));
  color = vec4(color.rgb*gradFactor,1);
  
  gl_FragColor = color;
}

