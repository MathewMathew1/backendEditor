import { expect } from 'chai';
import { sanitizeValueInTextDocument } from '../helpers/textDocumentHelpers';

describe('sanitizeValueInTextDocument', () => {
  it('should sanitize the HTML input', () => {
    const input = '<script>alert("Hello world!");</script><p class="page" style="display: grid; grid-template-columns:150mm 60mm; margin-left:20mm;">This is a paragraph with a <a href="javascript:alert(\'Hello world!\')">link</a>.</p>';
    const expectedOutput = '<p class="page" style="display:grid;grid-template-columns:150mm 60mm;margin-left:20mm">This is a paragraph with a <a>link</a>.</p>';
    const sanitizedHtml = sanitizeValueInTextDocument(input);
    console.log({sanitizedHtml})
    expect(sanitizedHtml).to.equal(expectedOutput);
  });
});

  
  
  
  
  
  
  
