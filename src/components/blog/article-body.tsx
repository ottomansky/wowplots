interface Props {
  content: string;
}

export function ArticleBody({ content }: Props) {
  const html = markdownToHtml(content);

  return (
    <div
      className="prose prose-invert max-w-none
        [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-text-primary [&_h2]:scroll-mt-20
        [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-text-primary [&_h3]:scroll-mt-20
        [&_p]:text-[15px] [&_p]:text-text-secondary [&_p]:leading-[1.7] [&_p]:mb-5
        [&_ul]:text-[15px] [&_ul]:text-text-secondary [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:text-[15px] [&_ol]:text-text-secondary [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mb-2 [&_li]:leading-[1.7]
        [&_strong]:text-text-primary [&_strong]:font-semibold
        [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-3 [&_a]:decoration-accent/40 hover:[&_a]:decoration-accent hover:[&_a]:text-accent-hover
        [&_blockquote]:border-l-2 [&_blockquote]:border-accent/20 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-text-muted [&_blockquote]:my-6
        [&_code]:text-accent [&_code]:bg-bg-tertiary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[13px]
        [&_hr]:border-border [&_hr]:my-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function markdownToHtml(md: string): string {
  let html = md
    // Headers with IDs for TOC linking
    .replace(/^### (.*$)/gim, (_match, text) => {
      const id = slugify(text);
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.*$)/gim, (_match, text) => {
      const id = slugify(text);
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/^# (.*$)/gim, (_match, text) => {
      const id = slugify(text);
      return `<h1 id="${id}">${text}</h1>`;
    })
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
  // Clean up: remove paragraphs wrapping block elements
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/<p>\s*(<h[1-3][^>]*>)/g, "$1");
  html = html.replace(/(<\/h[1-3]>)\s*<\/p>/g, "$1");
  html = html.replace(/<p>\s*(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)\s*<\/p>/g, "$1");
  html = html.replace(/<p>\s*(<hr>)\s*<\/p>/g, "$1");

  return html;
}
