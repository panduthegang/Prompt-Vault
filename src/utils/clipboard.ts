/**
 * Universal Mobile-Safe Clipboard Copy Utility
 * 
 * Works reliably across:
 * 1. HTTPS / Localhost (Modern Navigator Clipboard API)
 * 2. Mobile LAN / Wi-Fi testing (e.g. http://192.168.x.x where navigator.clipboard is undefined due to insecure context)
 * 3. iOS Safari & Android WebViews (handles selection ranges & prevents viewport scroll/zoom)
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // 1. Try modern navigator.clipboard in secure contexts
  if (typeof window !== 'undefined' && window.isSecureContext && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Navigator clipboard API failed, trying mobile fallback:', err);
    }
  }

  // 2. Robust iOS / Android / Insecure HTTP fallback via textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Prevent screen jump or zoom on iOS Safari
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.fontSize = '16px'; // Prevents iOS Safari auto-zoom
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Essential for mobile selection

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    return successful;
  } catch (err) {
    console.error('All clipboard copy methods failed:', err);
    return false;
  }
}
