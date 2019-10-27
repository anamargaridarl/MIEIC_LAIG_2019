class MySecurityCamera extends CGFobject {
  constructor(scene) {
    super(scene);
    this.camera = new MyRectangle(scene.gl,screen.width*3/4,screen.width,-screen.height/4,-screen.height);
    this.cameraShader = new CGFshader(scene.gl,"scenes/shaders/sample.vert");
    this.cameraShader.setUniformValues({uSampler2: 1, uSampler3:2});
    this.initBuffers();
  }

  initBuffers() {
    this.camera.initBuffers();
  }

  display() {
    this.scene.disable(this.scene.gl.DEPTH_TEST);
    this.scene.setActiveShader(this.cameraShader);
    this.camera.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.enable(this.scene.gl.DEPTH_TEST);
  }
}