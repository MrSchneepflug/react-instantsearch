import {runMode} from 'codemirror/addon/runmode/runmode.node';
import 'codemirror/mode/jsx/jsx';

import escape from 'escape-html';

const blockTheme = 'cm-s-default';
const spanTheme = 'cm-s-default';

export default function highlight(source, lang = 'js', inline = false) {
  let output = '';
  // Even though highlight accepts a lang parameter, force to JSX for now.
  runMode(source, 'jsx', (text, style) => {
    text = escape(text);
    if (!style) {
      output += text;
      return;
    }
    const className = style.split(' ').map(s => `cm-${s}`).join(' ');
    output += `<span class="${className}">${text}</span>`;
  });

  if (inline) {
    return `<code class="CodeMirror ${spanTheme}">${output}</code>`;
  }

  return `<pre class="CodeMirror ${blockTheme}"><code>${output}</code></pre>`;
}