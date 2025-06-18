
export const ShoppingCartLogo = () => (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* The same gradient is preserved for brand consistency */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#A78BFA", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#6D28D9", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
  
      {/* Cart body - applying the gradient to the stroke for a line-art look */}
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
  
      {/* Cart wheels - applying the gradient to the fill */}
      <circle cx="9" cy="21" r="1.5" fill="url(#logoGradient)" />
      <circle cx="20" cy="21" r="1.5" fill="url(#logoGradient)" />
    </svg>
  );