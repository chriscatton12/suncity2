// JavaScript to dynamically style the "Links" button
window.onload = function() {
    var linksButton = document.getElementById('linksButton');
    linksButton.style.display = 'inline-block';
    linksButton.style.fontSize = '20px';
    linksButton.style.fontWeight = '600';
    linksButton.style.padding = '12px 25px';
    linksButton.style.borderRadius = '30px';
    linksButton.style.backgroundColor = '#000'; // Linktree-like black background
    linksButton.style.color = '#fff'; // White text color
    linksButton.style.textDecoration = 'none'; // Remove underline
    linksButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Subtle shadow

    // Add hover effect
    linksButton.addEventListener('mouseenter', function() {
        linksButton.style.backgroundColor = '#333'; // Darken on hover
        linksButton.style.transform = 'scale(1.05)'; // Slight zoom on hover
    });

    linksButton.addEventListener('mouseleave', function() {
        linksButton.style.backgroundColor = '#000'; // Revert back to original
        linksButton.style.transform = 'scale(1)'; // Reset zoom
    });
};
