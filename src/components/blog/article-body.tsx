interface Props {
  content: string;
}

export function ArticleBody({ content }: Props) {
  // Simple markdown-to-HTML renderer for initial articles
  // Will be replaced with proper MDX rendering in Phase 2
  const html = markdownToHtml(content);

  return (
    <div
      className="prose prose-invert max-w-none
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-text-primary
        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-text-primary
        [&_p]:text-text-secondary [&_p]:leading-relaxed [&_p]:mb-4
        [&_ul]:text-text-secondary [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:text-text-secondary [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mb-1.5 [&_li]:leading-relaxed
        [&_strong]:text-text-primary [&_strong]:font-semibold
        [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-hover
        [&_blockquote]:border-l-2 [&_blockquote]:border-accent/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-muted
        [&_code]:text-accent [&_code]:bg-bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
        [&_hr]:border-border [&_hr]:my-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function markdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Code
    .replace(/`(.*?)`/g, "<code>$1</code>")
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Horizontal rule
    .replace(/^---$/gim, "<hr>")
    // Line breaks → paragraphs
    .replace(/\n\n/g, "</p><p>")
    // Unordered lists (basic)
    .replace(/^\- (.*$)/gim, "<li>$1</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Wrap in paragraphs
  html = `<p>${html}</p>`;
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/<p>\s*(<h[1-3]>)/g, "$1");
  html = html.replace(/(<\/h[1-3]>)\s*<\/p>/g, "$1");
  html = html.replace(/<p>\s*(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)\s*<\/p>/g, "$1");
  html = html.replace(/<p>\s*(<hr>)\s*<\/p>/g, "$1");

  return html;
}
