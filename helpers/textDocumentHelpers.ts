import sanitizeHtml from 'sanitize-html';


const sanitizeValueInTextDocument = (text: string) => {
    const sanitizedHtml = sanitizeHtml(text, {
        allowedTags: [ 'p', 'ul', 'ol', 'li', 'b', 'i',  'span', 'a', 'img', 'br' ],
        allowedClasses: { '*': ["page", "column"] },        
        allowedAttributes: {
          'a': [ 'href' ],
          '*': ['style'],
          "img": ['src', 'alt'],
        },
        allowedStyles: {
            '*': {
              // Match HEX and RGB
              'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
              'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
              'text-align': [/^left$/, /^right$/, /^center$/],
              'font-family':[ /[^';"]+/],
              // Match any number with px, em, or %
              'font-size': [/^\d+(?:px|em|%|rem)$/],
              'margin-left': [/^\d+(?:px|em|mm|%|rem)$/],
              'padding-left': [/^\d+(?:px|em|mm|%|rem)$/],
              'margin-right': [/^\d+(?:px|em|mm|%|rem)$/],
              'height': [/^(\d+(?:px|em|mm|%|rem)$|fit-content)/],
              'margin-top': [/^\d+(?:px|em|mm|%|rem)$/],
              'padding-top': [/^\d+(?:px|em|mm|%|rem)$/],
              'padding-bottom': [/^\d+(?:px|em|mm|%|rem)$/],
              'line-height': [/^\d+(?:px|em|%|rem)$/],
              'text-indent': [/^\d+(?:px|em|%|rem)$/],
              'text-decoration': [/^ underline$/, /^line-through$/, /^none$/],
              'vertical-align': [/^ sub$/, /^super$/, /^none$/],
              'font-style': [/^ italic$/, /^normal$/ ],
              'font-weight': [/^bold$|^\d+$|^normal$/i ],
              'display': [/^(grid|inline-grid|block)$/i],
              'rotate': [/^\d+(?:deg)$/],
              'box-sizing': [/^(border-box|)$/i],
              'borderCollapse': [/^(collapse|)$/i],
              'overflow': [/^(hidden|)$/i],
              'border': [/^(1px solid|)$/i],
              'word-break': [/^(break-all|)$/i],
              "min-height": [/^\d+(?:px|em|%|rem)$/],
              'grid-template-columns': [/^(\d+(?:px|mm|em|rem)\s+){1,2}\d+(?:px|mm|em|rem)$/]            },
          
        }
    });
    return sanitizedHtml
}

export {sanitizeValueInTextDocument}