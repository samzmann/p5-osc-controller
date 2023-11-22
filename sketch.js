let button_1

 class Control {
  isActive = false
  volume = 0

  constructor(label, posX, posY, ctrl_width, ctrl_height) {
    this.label = label

    const header_height =  40
    const btn_top = posY + header_height
    const btn_height = 50

    const vol_label_top = btn_top + btn_height
    const vol_label_height = 20
    const vol_slider_top = vol_label_top + vol_label_height
    const vol_slider_height = 32

    const fx1_label_top = vol_slider_top + vol_slider_height
    const fx1_label_height = 20
    const fx1_slider_top = fx1_label_top + fx1_label_height
    const fx1_slider_height = 32

    this.dimensions = {
      posX,
      posY,
      width: ctrl_width,
      height: ctrl_height,
      header_top: posY,
      header_height,
      btn_top,
      btn_height,
      vol_label_top,
      vol_label_height,
      vol_slider_top,
      vol_slider_height,

      fx1_label_top,
      fx1_label_height,
      fx1_slider_top,
      fx1_slider_height,
    }

    this.button = createButton(
      `${label}_btn`,
      posX,
      this.dimensions.btn_top,
      ctrl_width,
      this.dimensions.btn_height,
    )

    this.button.label = "OFF"
    
    this.button.setStyle({
      fillBg: color("#eb4034"),
      rounding: 0,
    })

    this.slider_volume = createSlider(
      `${label}_sl_vol`,
      posX,
      this.dimensions.vol_slider_top,
      ctrl_width,
      this.dimensions.vol_slider_height,
      0,
      100
    )

    this.slider_volume.isInteger = true

    this.slider_fx1 = createSlider(
      `${label}_sl_fx1`,
      posX,
      this.dimensions.fx1_slider_top,
      ctrl_width,
      this.dimensions.fx1_slider_height,
      0,
      100
    )

    this.slider_fx1.isInteger = true
  }

  show() {
    noFill()
    stroke(255,0,0)
    rect(
      this.dimensions.posX,
      this.dimensions.posY,
      this.dimensions.width,
      this.dimensions.height,
      )

    noStroke()
    fill(0)

    let text_sz = 25
    textSize(text_sz);
    text(this.label, this.dimensions.posX, this.dimensions.header_top + text_sz)

    text_sz = 16
    textSize(text_sz);
    text("Vol", this.dimensions.posX, this.dimensions.vol_label_top + text_sz)
    text("FX1", this.dimensions.posX, this.dimensions.fx1_label_top + text_sz)
  }

  update() {

    if (this.button.isPressed) {
      this.isActive = !this.isActive
      const {label} = this.button
      print(this.label + ".isActive:", this.isActive);
      this.button.label = this.isActive ? "ON" : "OFF"
      this.button.setStyle({
        fillBg: color(this.isActive ? "#34eb89" :"#eb4034")
    });
    
    }

    
    if (this.slider_volume.isChanged) {
      const {label, val} = this.slider_volume
      print(label + ": " + val);
    }

    if (this.slider_fx1.isChanged) {
      const {label, val} = this.slider_fx1
      print(label + ": " + val);
    }
  }

 }


const controlWidth = 200
const controlHeight = 300
const controlPadding = 20

const controls = []

function setup() {
  createCanvas(windowWidth, windowHeight);

  gui = createGui()
  controls.push(new Control('CTRL_1', 0 * controlWidth,0, controlWidth, controlHeight))
  controls.push(new Control('CTRL_2', 1 * controlWidth +  controlPadding,0, controlWidth, controlHeight))
}

function draw() {
  background(255);

  drawGui();

  for (let i = 0; i < controls.length; i++) {
    controls[i].show()
    controls[i].update()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}