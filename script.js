const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearCanvas = document.getElementById("clearCanvas");
const downloadCanvas = document.getElementById("downloadCanvas");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineCap = "round";
context.lineJoin = "round";
context.strokeStyle = colorPicker.value;
context.lineWidth = brushSize.value;

function draw(event) {
    if (!isDrawing) return;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
    context.stroke();

    lastX = event.clientX - canvas.getBoundingClientRect().left;
    lastY = event.clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    lastX = event.clientX - canvas.getBoundingClientRect().left;
    lastY = event.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("touchstart", (event) => {
    isDrawing = true;
    const touch = event.touches[0];
    lastX = touch.clientX - canvas.getBoundingClientRect().left;
    lastY = touch.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    draw(touch);
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("touchend", () => (isDrawing = false));

colorPicker.addEventListener("input", () => {
    context.strokeStyle = colorPicker.value;
});

brushSize.addEventListener("input", () => {
    context.lineWidth = brushSize.value;
});

clearCanvas.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

downloadCanvas.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "mi_dibujo.png";
    link.click();
});
