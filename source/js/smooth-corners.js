// Copied from https://github.com/wopian/smooth-corners and modified.
registerPaint("smooth-corners", class {
  static get inputProperties() {
    return ["--smooth-corners"];
  }

  superellipse(r, nX = 4, nY) {
    if (Number.isNaN(nX)) nX = 4;
    if (typeof nY === "undefined" || Number.isNaN(nY)) nY = nX;
    if (nX > 100) nX = 100;
    if (nY > 100) nY = 100;
    if (nX < 0.00000000001) nX = 0.00000000001;
    if (nY < 0.00000000001) nY = 0.00000000001;

    const nX2 = 2 / nX;
    const nY2 = nY ? 2 / nY : nX2;
    const steps = 360;
    const step = (2 * Math.PI) / steps;
    const points = t => {
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      return {
        x: Math.abs(cosT) ** nX2 * r * Math.sign(cosT),
        y: Math.abs(sinT) ** nY2 * r * Math.sign(sinT)
      };
    };
    return Array.from({ length: steps }, (_, i) => points(i * step));
  }

  paint(ctx, geom, properties) {
    const [nX, nY, r] = properties
      .get("--smooth-corners")
      .toString()
      .replace(/ /g, "")
      .split(",");

    const width = geom.width / 2;
    const height = geom.height / 2;
    let radius = 0.01 * r * width;
    if (radius < 5) radius = 5;
    let smooth = this.superellipse(
      radius,
      parseFloat(nX, 10),
      parseFloat(nY, 10)
    );

    const offset = {
      x: geom.width / 2 - radius,
      y: geom.height / 2 - radius
    };
    const offsetFunc = (x, y) => {
      return function (item) {
        item.x += x;
        item.y += y;
        return item;
      }
    }

    smooth = [].concat(
      smooth.slice(0, 90).map(offsetFunc(offset.x, offset.y)),
      smooth.slice(91, 180).map(offsetFunc(-offset.x, offset.y)),
      smooth.slice(181, 270).map(offsetFunc(-offset.x, -offset.y)),
      smooth.slice(271, 360).map(offsetFunc(offset.x, -offset.y)),
    );

    ctx.fillStyle = "#000";
    ctx.setTransform(1, 0, 0, 1, width, height);
    ctx.beginPath();

    for (let i = 0; i < smooth.length; i++) {
      const { x, y } = smooth[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
  }
});