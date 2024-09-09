document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;

    // set stroke line
    context.strokeStyle = '#FF0000';
    context.lineWidth = 2;

    // Set the canvas size
    canvas.width = 500;
    canvas.height = 400;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
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

    // Function to clear the canvas
    window.clearCanvas = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});
