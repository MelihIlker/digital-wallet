export function parseUserAgent(ua?: string) {
  if (!ua) return { browser: null, browserVersion: null, os: null, raw: '' };

  const browserMatch = ua.match(/(Firefox|Chrome|Safari|Opera|Edg|MSIE|Trident)\/?\s*([0-9.]*)/i);
  const osMatch = ua.match(/\(([^)]+)\)/);

  return {
    browser: browserMatch ? browserMatch[1] : null,
    browserVersion: browserMatch ? browserMatch[2] : null,
    os: osMatch ? osMatch[1] : null,
    raw: ua,
  };
}