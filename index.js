var spacing = 10;
var points = [];

function setup() {
  let cnv = createCanvas(800, 640);
  cnv.parent("canvas");
  colorMode(HSB, 100);
  strokeWeight(2);
}

function draw() {
  background(0, 0, 15);
  let origin = {x: width/2, y: height/2};
  let halfExtents = {x: width*.80/2, y:height*.80/2};

  stroke(50, 80, 80);
  line(origin.x, origin.y - halfExtents.y, origin.x, origin.y + halfExtents.y);
  stroke(0, 50, 80);
  line(origin.x - halfExtents.x, origin.y, origin.x + halfExtents.x, origin.y);

  let functions = $("#functions").find("li");
  let num = functions.length;

  for (let f of functions) {
    let sliders = $(f).find(".slider");
    let h = $(f).find(".hslider").val();
    let coeffs = []
    for (slider of sliders) {
      coeffs.push($(slider).val());
    }
    let poly = new Polynomial(coeffs);

    textSize(20);
    fill(0, 0, 100);
    text(poly.print(), 15, 30);
    text(poly.eval(1), 15, 60);

    beginShape();
    for(let x = -halfExtents.x; x <= halfExtents.x; x += spacing) {
      let point = new Point(origin.x + x, origin.y - poly.eval(x/100)*10, h);
      point.draw();
    }
    noFill();
    endShape();
  }
}

function addFunc() {
  let li = $("#functionTemplate").clone();
  let hslider = $(li).find(".hslider");
  $(hslider).val($("#functions").find("li").length * 20 + 30);
  $(hslider).siblings(".hvalue").text($(hslider).val());
  $(hslider).parents("li").css("border-color", `hsl(${($(hslider).val()/100*360)}, 70%, 50%)`);
  $("#functions").append(li);
  attachEvents();
}

$(document).ready(() => {
  attachEvents();

  $("#sslider").on('input', function() {
    $("#svalue").text($(this).val());
    spacing = parseInt($(this).val());
  })
})

function attachEvents() {
  $(".slider").on('input', function() {
    $(this).siblings(".value").text($(this).val());
  })
  $(".hslider").on('input', function() {
    $(this).siblings(".hvalue").text($(this).val());
    $(this).parents("li").css("border-color", `hsl(${($(this).val()/100*360)}, 70%, 50%)`);
  })
  $(".removeBlock").click(function() {
    if ($("#functions").find("li").length <= 1) return;
    $(this).parent().remove();
  })
  $(".addTerm").click(function() {
    let slider = $(".sliders").children().first().clone();
    $(this).siblings(".sliders").prepend(slider);
  })
}
