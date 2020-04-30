class Polynomial {
  constructor(terms) {
    this.terms = terms;
  }

  eval(x) {
    let val = 0;
    let order = this.terms.length-1
    for (let t = 0; t <= order; t++) {
      val += Math.pow(x, order-t) * this.terms[t];
    }
    return val;
  }

  print() {
    let str = "";
    let order = this.terms.length-1;
    for (let t = 0; t <= order; t++) {
      let coeff = this.terms[t];
      if (t < order - 1) {
        if (coeff == 0) { continue; }
        str += `${coeff}x^${order-t} + `;
      } else if (t == order - 1) {
        if (coeff == 0) { continue; }
        str += `${coeff}x + `;
      } else {
        str += `${coeff}`;
      }
    }
    str += "$";
    while (str.includes(" + 0$")) {
      str = str.substring(0, str.length-5);
      str+="$";
    }
    str = str.substring(0, str.length-1);
    return str;
  }
}
