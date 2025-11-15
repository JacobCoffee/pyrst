/**
 * Toast notification system
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i data-feather="${iconName}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">
            <i data-feather="x"></i>
        </button>
    `;

    container.appendChild(toast);
    feather.replace({ width: 18, height: 18 });

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

/**
 * Export functions
 */

// Copy RST to clipboard
async function copyRSTToClipboard() {
    const editor = document.getElementById('editor');
    const rstContent = editor.value;

    try {
        await navigator.clipboard.writeText(rstContent);
        showToast('RST copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy RST:', err);
        showToast('Failed to copy RST', 'error');
    }
}

// Copy HTML to clipboard
async function copyHTMLToClipboard() {
    const preview = document.getElementById('preview');
    const htmlContent = preview.innerHTML;

    try {
        await navigator.clipboard.writeText(htmlContent);
        showToast('HTML copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy HTML:', err);
        showToast('Failed to copy HTML', 'error');
    }
}

// Download RST file
function downloadRSTFile() {
    const editor = document.getElementById('editor');
    const rstContent = editor.value;
    const blob = new Blob([rstContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.rst';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('RST file downloaded!', 'success');
}

// Download HTML file with inline CSS
function downloadHTMLFile() {
    const preview = document.getElementById('preview');
    const previewCSS = getPreviewCSS();
    const htmlContent = preview.innerHTML;

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
${previewCSS}
    </style>
</head>
<body>
    <div id="preview">
${htmlContent}
    </div>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('HTML file downloaded!', 'success');
}

// Get preview CSS for standalone HTML
function getPreviewCSS() {
    return `body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:900px;margin:0 auto;padding:2rem;background-color:#fff}#preview h1,#preview h2{font-weight:700;margin-top:1.5rem;margin-bottom:1rem}#preview h1{font-size:1.875rem;line-height:2.25rem}#preview h2{font-size:1.5rem;line-height:2rem}#preview h3{font-size:1.25rem;line-height:1.75rem;font-weight:600;margin-top:1rem;margin-bottom:.5rem}#preview p{margin-bottom:1rem;line-height:1.625}#preview ul,#preview ol{margin-left:1.5rem;margin-bottom:1rem}#preview ul{list-style-type:disc}#preview ol{list-style-type:decimal}#preview li{margin-bottom:.25rem}#preview a{color:#2563eb;text-decoration:underline}#preview a:hover{color:#1d4ed8}#preview strong{font-weight:700}#preview em{font-style:italic}#preview code{background-color:#f3f4f6;padding:.125rem .375rem;border-radius:.25rem;font-size:.875rem;font-family:ui-monospace,monospace}#preview pre{background-color:#1f2937;color:#f3f4f6;padding:1rem;border-radius:.5rem;margin-bottom:1rem;overflow-x:auto;font-family:ui-monospace,monospace}#preview pre code{background-color:transparent;padding:0}#preview blockquote{border-left:4px solid #d1d5db;padding-left:1rem;font-style:italic;margin:1rem 0;color:#6b7280}#preview table{border-collapse:collapse;margin-bottom:1rem;width:100%}#preview th{border:1px solid #d1d5db;padding:.5rem 1rem;background-color:#f3f4f6;font-weight:700;text-align:left}#preview td{border:1px solid #d1d5db;padding:.5rem 1rem}`;
}

// Download as PDF using print API
function downloadPDF() {
    window.print();
}

/**
 * Initialize export buttons
 */
function initExportButtons() {
    document.getElementById('btn-copy-rst').addEventListener('click', copyRSTToClipboard);
    document.getElementById('btn-copy-html').addEventListener('click', copyHTMLToClipboard);
    document.getElementById('btn-download-rst').addEventListener('click', downloadRSTFile);
    document.getElementById('btn-download-html').addEventListener('click', downloadHTMLFile);
    document.getElementById('btn-download-pdf').addEventListener('click', downloadPDF);
    console.log('Export buttons initialized!');
}
