import sanitizeHtml from "sanitize-html";

const sanitizeValueInTextDocument = (text: string) => {
  const sanitizedHtml = sanitizeHtml(text, {
    allowedTags: [
      "p",
      "ul",
      "ol",
      "li",
      "b",
      "i",
      "span",
      "a",
      "img",
      "br",
      "table",
      "tbody",
      "tr",
      "td",
    ],
    allowedClasses: { "*": ["page", "column"] },
    allowedAttributes: {
      a: ["href"],
      "*": ["style"],
      img: ["src", "alt"],
    },
    allowedStyles: {
      "*": {
        "background-color": [/^#(0x)?[0-9a-f]+$/i, /^rgb\(.+\)$/],
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(.+\)$/],
        "text-align": [/^left$|^right$|^center$/],
        "font-family": [/[^';"]+/],
        "font-size": [/^\d+(px|em|%|rem|pt)$/],
        width: [/^\d+(\.\d+)?(px|em|%|rem|pt|mm)$/],
        height: [/^\d+(\.\d+)?(px|em|%|rem|pt|mm|fit-content)$/],
        "margin-left": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "margin-right": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "margin-top": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "padding-left": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "padding-top": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "padding-bottom": [/^\d+(\.\d+)?(px|em|mm|%|rem|pt)$/],
        "line-height": [/^\d+(px|em|%|rem)$/],
        "text-decoration": [/^(underline|line-through|none)$/i],
        "vertical-align": [/^(sub|super|none)$/],
        "font-style": [/^italic$|^\d+$|^normal$/i],
        "font-weight": [/^bold$|^\d+$|^normal$/i],
        display: [/^(grid|inline-grid|block)$/i],
        rotate: [/^\d+(deg)$/],
        "box-sizing": [/^(border-box)?$/i],
        "border-collapse": [/^(collapse)?$/i],
        overflow: [/^(hidden)?$/i],
        border: [/^\d+(\.\d+)?(px|pt) solid( [a-zA-Z#0-9]+)?$/],
        "word-break": [/^(break-all)$/i],
        "min-height": [/^\d+(\.\d+)?(px|em|%|rem|pt)$/],
        "grid-template-columns": [
          /^(\d+(px|mm|em|rem)\s+){1,2}\d+(px|mm|em|rem)$/,
        ],
      },
    },
  });
  return sanitizedHtml;
};

export { sanitizeValueInTextDocument };
