// Create and append MathJax script
var script = document.createElement('script');
script.type = 'text/javascript';
script.id = 'MathJax-script';
script.async = true;
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

// Configure MathJax
window.MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true
  }
};

// Add to page
document.head.appendChild(script);