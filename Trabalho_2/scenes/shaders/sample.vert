#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;


varying vec2 vTextureCoord;
uniform float timeFactor;

void main() {
	vTextureCoord = aTextureCoord;
	vTextureCoord = vec2(vTextureCoord.x,1.0-vTextureCoord.y);
	vec4 vertex=vec4(aVertexPosition, 1.0);
	gl_Position = vertex;
}
