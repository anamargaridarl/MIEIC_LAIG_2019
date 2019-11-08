#ifdef GL_ES
  precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;
uniform vec2 u_resolution;

void main() {
  // float dist = distance(vec2(0),gl_FragCoord.xy/u_resolution);
  // float max_dist = distance(vec2(-1,-1),vec2(0,0));
  vec4 color = texture2D(uSampler, vTextureCoord);
  //color = mix(color,vec4(0.0, 0.0, 0.0, 1.0), dist/max_dist);

  if(mod(vTextureCoord.y * 10.0-timeFactor, 2.0) > 1.0)
      color = vec4(color.rgb*0.5,1);//color = vec4(1,1,1,1.0);

  gl_FragColor = color;
}

