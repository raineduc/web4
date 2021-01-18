export class Point {
  /**
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {Boolean} hit - is hit
   */
  constructor(x, y, hit) {
    this.y = y;
    this.x = x;
    this.hit = hit;
  }

  /**
   * @returns {number} X
   */
  getX() {
    return this.x;
  }

  /**
   * @returns {number} Y
   */
  getY() {
    return this.y;
  }

  isHit() {
    return this.hit;
  }
}
