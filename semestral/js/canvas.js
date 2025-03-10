document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function drawRedRect(x, y) {
        const width = 64;
        const height = 64;
        ctx.fillStyle = "red";
        // Center the rectangle on the click
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();

        // Calculate scale factor in case of canvas scaling
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Adjust click coordinates
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        drawRedRect(x, y);
    });
});
