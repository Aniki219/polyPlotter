class Point {
  constructor(x, y, hue = 0) {
    this.x = x;
    this.y = y;
    this.hue = hue;
  }

  draw() {
    stroke(this.hue, 100, 100);
    //fill(hue, 100, 100);
    //ellipse(this.x, this.y, 4, 4);
    curveVertex(this.x, this.y);
  }
}
