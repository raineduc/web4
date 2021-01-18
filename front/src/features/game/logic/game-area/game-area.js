import { Point } from './point.js';

let canvas; let ctx;

const tipWidth = 10;
const tipHeight = Math.tan(Math.PI / 6) * tipWidth;

const SUCCESS_COLOR = '#68D391';
const FAILURE_COLOR = '#f44336';

const colors = ['#2C7A7B', '#1890ff', '#b71c1c', '#00c853', '#f57f17'];

export const draw = (radiusValues, points, canvasRef) => {
  if (canvasRef) {
    canvas = canvasRef;
    ctx = canvasRef.getContext('2d');
  } else {
    canvas = document.querySelector('.game-area__image');
    ctx = canvas.getContext('2d');
  }
  const { width } = canvas;
  const { height } = canvas;
  ctx.font = '400 14px Roboto';
  ctx.clearRect(0, 0, width, height);
  drawCoordSystem(radiusValues);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000000';
  if (points && points.length) {
    drawPoints(points, Math.max(...radiusValues));
  }
};

export const drawPoints = (points, maxRadius) => {
  const maxR = maxRadius === 0 ? 0.5 : maxRadius;
  points.forEach((point) => {
    ctx.beginPath();
    const newPoint = translateRCoordsToCanvasCoords(point, maxR);
    ctx.save();
    ctx.fillStyle = point.hit ? SUCCESS_COLOR : FAILURE_COLOR;
    ctx.arc(newPoint.x, newPoint.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  });
};

export const getNearestAllowedValue = (coord, allowedValues) => allowedValues.reduce(
  (acc, x) => (Math.abs(x - coord) < Math.abs(acc - coord) ? x : acc),
  Infinity,
);

export const translateCanvasElemCoordsToRCoords = (point, maxRadius) => {
  const maxR = maxRadius === 0 ? 0.5 : maxRadius;
  const scaleX = canvas.width / canvas.clientWidth;
  const scaleY = canvas.height / canvas.clientHeight;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const lengthToRadiusMark = calculateLengthToRadiusMark(maxR, maxR);
  const newX = ((point.x * scaleX - centerX) / lengthToRadiusMark) * maxR;
  const newY = ((centerY - point.y * scaleY) / lengthToRadiusMark) * maxR;
  return new Point(newX, newY, point.hit);
};

export const translateRCoordsToCanvasCoords = (point, maxRadius) => {
  const maxR = maxRadius === 0 ? 0.5 : maxRadius;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const lengthToRadiusMark = calculateLengthToRadiusMark(maxR, maxR);
  const newX = ((point.x * lengthToRadiusMark) / maxR + centerX);
  const newY = (centerY - (point.y * lengthToRadiusMark) / maxR);
  return new Point(newX, newY, point.hit);
};

function drawCoordSystem(radiusValues) {
  const { width } = canvas;
  const { height } = canvas;
  ctx.beginPath();
  ctx.moveTo(5, height / 2);
  ctx.lineTo(width - 5, height / 2);
  ctx.lineTo(width - 5 - tipWidth, height / 2 - tipHeight);
  ctx.moveTo(width - 5, height / 2);
  ctx.lineTo(width - 5 - tipWidth, height / 2 + tipHeight);
  ctx.moveTo(width / 2, height - 5);
  ctx.lineTo(width / 2, 5);
  ctx.lineTo(width / 2 + tipHeight, 5 + tipWidth);
  ctx.lineTo(width / 2, 5);
  ctx.lineTo(width / 2 - tipHeight, 5 + tipWidth);
  ctx.stroke();
  ctx.closePath();

  if (radiusValues && radiusValues.length) {
    const maxRadius = Math.max(...radiusValues);
    let alpha = 0.7;
    radiusValues.forEach((radius, index) => {
      if (maxRadius !== 0) {
        drawRadiusMarks(radius, maxRadius);
        drawArea(radius, maxRadius, colors[index > 4 ? 4 : index], alpha);
      } else {
        drawRadiusMarks(0.5, 0.5);
      }
      alpha -= 0.1;
    });
  }
}

function drawRadiusMarks(radius, maxRadius) {
  const { width } = canvas;
  const { height } = canvas;
  const lengthToRadiusMark = calculateLengthToRadiusMark(radius, maxRadius);
  const centerX = width / 2;
  const centerY = height / 2;

  const textRadius = fitFloatNumber(radius);

  ctx.beginPath();
  ctx.moveTo(centerX + lengthToRadiusMark, centerY + 5);
  ctx.lineTo(centerX + lengthToRadiusMark, centerY - 5);
  ctx.fillText(textRadius, centerX + lengthToRadiusMark - 10, centerY + 15);
  ctx.moveTo(centerX + lengthToRadiusMark / 2, centerY + 5);
  ctx.lineTo(centerX + lengthToRadiusMark / 2, centerY - 5);
  ctx.moveTo(centerX - lengthToRadiusMark, centerY + 5);
  ctx.lineTo(centerX - lengthToRadiusMark, centerY - 5);
  ctx.fillText(
    `-${textRadius}`,
    centerX - lengthToRadiusMark - 10,
    centerY + 15,
  );
  ctx.moveTo(centerX - lengthToRadiusMark / 2, centerY + 5);
  ctx.lineTo(centerX - lengthToRadiusMark / 2, centerY - 5);
  ctx.moveTo(centerX + 5, centerY - lengthToRadiusMark);
  ctx.lineTo(centerX - 5, centerY - lengthToRadiusMark);
  ctx.fillText(textRadius, centerX + 10, centerY - lengthToRadiusMark + 5);
  ctx.moveTo(centerX + 5, centerY - lengthToRadiusMark / 2);
  ctx.lineTo(centerX - 5, centerY - lengthToRadiusMark / 2);
  ctx.moveTo(centerX + 5, centerY + lengthToRadiusMark);
  ctx.lineTo(centerX - 5, centerY + lengthToRadiusMark);
  ctx.fillText(
    `-${textRadius}`,
    centerX + 10,
    centerY + lengthToRadiusMark + 5,
  );
  ctx.moveTo(centerX + 5, centerY + lengthToRadiusMark / 2);
  ctx.lineTo(centerX - 5, centerY + lengthToRadiusMark / 2);
  ctx.stroke();
  ctx.closePath();
}

function drawArea(radius, maxRadius, color, alpha) {
  const { width } = canvas;
  const { height } = canvas;
  const lengthToRadiusMark = calculateLengthToRadiusMark(radius, maxRadius);
  const centerX = width / 2;
  const centerY = height / 2;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, lengthToRadiusMark / 2, 0, Math.PI / 2);
  ctx.lineTo(centerX, centerY - lengthToRadiusMark);
  ctx.lineTo(centerX - lengthToRadiusMark, centerY);
  ctx.fill();
  ctx.closePath();
  ctx.fillRect(
    centerX,
    centerY - lengthToRadiusMark,
    lengthToRadiusMark,
    lengthToRadiusMark,
  );
  ctx.restore();
}

function fitFloatNumber(num) {
  if (num.toString().search(/[\.\,]\d{2,}/) !== -1) {
    return num.toFixed(2).toString();
  }
  return num.toString();
}

function calculateLengthToRadiusMark(radius, relativeMaxRadius) {
  const { width } = canvas;
  const { height } = canvas;
  const maxLength = width / 2 - 10 - tipWidth;
  return (radius / relativeMaxRadius) * maxLength;
}
