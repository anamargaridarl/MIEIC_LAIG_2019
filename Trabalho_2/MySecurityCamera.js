class MySecurityCamera extends CGFobject {
  constructor(scene) {
    super(scene);
    this.camera = new MyRectangle(scene,"SecurityCamera",0.5,1,-1,-0.5);
    this.cameraShader = new CGFshader(scene.gl,"scenes/shaders/sample.vert","scenes/shaders/sample.frag");
    this.cameraShader.setUniformsValues({uSampler: 0, timeFactor:0});
  }

  display(texRTT) {
    this.scene.setActiveShader(this.cameraShader);
    texRTT.bind();
    this.camera.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    
  }

  update(t) {
    this.cameraShader.setUniformsValues({timeFactor: t / 100 % 1000});
  }
}