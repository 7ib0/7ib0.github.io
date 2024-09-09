document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;

    let brushColor = document.getElementById('colorPicker').value;
    let brushSize = document.getElementById('brushSize').value;

    document.getElementById('colorPicker').addEventListener('input', (e) => {
        brushColor = e.target.value;
    });

    document.getElementById('brushSize').addEventListener('input', (e) => {
        brushSize = e.target.value;
    });

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            context.strokeStyle = brushColor;
            context.lineWidth = brushSize;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    document.getElementById('clearCanvasBtn').addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
});
