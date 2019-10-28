class MySecurityCamera extends CGFobject {
  constructor(scene) {
    super(scene);
    this.camera = new MyRectangle(scene,screen.width*3/4,screen.width,-screen.height/4,-screen.height);
    this.cameraShader = new CGFshader(scene.gl,"scenes/shaders/sample.vert","scenes/shaders/sample.frag");
    this.cameraShader.setUniformsValues({uSampler2: 1, uSampler3:2});
    this.cameraApp = new CGFappearance(this.scene);
    this.initBuffers();
  }

  initBuffers() {
    this.camera.initBuffers();
  }

  display(texRTT) {
    this.scene.setActiveShader(this.cameraShader);
    this.cameraApp.setTexture(texRTT);
    this.cameraApp.apply();
    this.camera.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    
  }
}