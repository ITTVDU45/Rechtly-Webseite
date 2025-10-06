import { marked } from 'marked';
import { Blog } from "../../../.velite/generated";

interface RenderMdxProps {
  blog: Blog;
}

export default function RenderMdx({ blog }: RenderMdxProps) {
  // Erstelle eine Funktion zum Generieren von IDs aus Überschriften
  // Diese Funktion muss mit den bestehenden TOC-URLs kompatibel sein
  const generateId = (text: any): string => {
    // Stelle sicher, dass text ein String ist
    const textString = typeof text === 'string' ? text : String(text || '');
    
    return textString
      .toLowerCase()
      .replace(/&/g, '--') // Ersetze & mit doppelten Bindestrichen (wie TOC)
      .replace(/[^\w\s-ßäöü]/g, '') // Entferne Sonderzeichen, aber behalte ß und Umlaute
      .replace(/\s+/g, '-') // Ersetze Leerzeichen mit Bindestrichen
      .replace(/--+/g, '--') // Behalte doppelte Bindestriche bei, entferne nur mehrfache
      .replace(/^-+|-+$/g, '') // Entferne führende und nachfolgende Bindestriche
      .trim();
  };

  // Erweitere marked um automatische ID-Generierung
  const renderer = new marked.Renderer();
  
  renderer.heading = function({ tokens, depth }: { tokens: any[], depth: number }) {
    // Extrahiere den Text aus den Tokens
    const text = tokens.map(token => {
      if (typeof token === 'string') {
        return token;
      } else if (token && typeof token.text === 'string') {
        return token.text;
      } else if (token && token.raw) {
        return token.raw;
      } else if (token && token.type === 'text') {
        return token.text || '';
      }
      return '';
    }).join('');
    
    const id = generateId(text);
    return `<h${depth} id="${id}" class="scroll-mt-20">${text}</h${depth}>`;
  };

  // Konfiguriere marked für bessere HTML-Ausgabe mit automatischen IDs
  marked.setOptions({
    renderer: renderer,
    breaks: true,
    gfm: true,
  });

  const htmlContent = blog.content ? marked(blog.content) : '';

  return (
    <div className="col-span-12 lg:col-span-8">
      <article className="prose prose-xl max-w-none">
        <div className="font-in leading-relaxed">
          {blog.content ? (
            <div 
              className="prose prose-xl max-w-none
                         prose-headings:text-gray-900
                         prose-headings:font-bold prose-headings:tracking-tight
                         prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                         prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                         prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
                         prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6 prose-p:text-lg
                         prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-bold
                         prose-ul:text-gray-700 prose-ul:my-6 prose-ul:space-y-2
                         prose-ol:text-gray-700 prose-ol:my-6 prose-ol:space-y-2
                         prose-li:text-gray-700 prose-li:leading-7 prose-li:text-lg
                         prose-table:text-gray-700 prose-table:my-8 prose-table:border-collapse
                         prose-th:text-gray-900 prose-th:bg-gray-50 prose-th:font-semibold prose-th:p-4 prose-th:border prose-th:border-gray-300
                         prose-td:text-gray-700 prose-td:p-4 prose-td:border prose-td:border-gray-300
                         prose-blockquote:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
                         prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8
                         prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto
                         prose-hr:border-gray-300 prose-hr:my-12"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div>
              <h2>Artikel wird geladen...</h2>
              <p>Der Inhalt für diesen Artikel wird gerade vorbereitet.</p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
