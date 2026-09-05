const emptyText = node => node.type === "text" && /^[\s\u00a0]*$/.test(node.value);
const blank = node => emptyText(node) || (node.type === "element" &&
  (node.tagName === "br" || (["p", "div", "span"].includes(node.tagName) &&
    Object.keys(node.properties || {}).length === 0 && (node.children || []).every(blank))));

/** Clean editor spacer nodes after parsing HTML, never text inside code blocks.
 * Attribute-bearing anchors/media containers remain intact. Image-only paragraphs
 * are unwrapped so the renderer can emit a valid figure outside a paragraph.
 */
export default function rehypeContentCleanup() {
  return function transform(tree) {
    function walk(parent) {
      if (!parent.children || ["pre", "code", "svg", "math"].includes(parent.tagName)) return;
      for (const child of parent.children) walk(child);
      parent.children = parent.children.flatMap(node => {
        if (node.type !== "element") return [node];
        if (["p", "div", "span"].includes(node.tagName) &&
          Object.keys(node.properties || {}).length === 0 && (node.children || []).every(blank)) return [];
        if (node.tagName === "p" && (node.children || []).some(child => child.tagName === "img") &&
          node.children.every(child => child.tagName === "img" || emptyText(child))) return node.children;
        return [node];
      });
      parent.children = parent.children.filter((node, index, nodes) => {
        if (node.tagName !== "br") return true;
        let previous = index - 1;
        while (previous >= 0 && emptyText(nodes[previous])) previous--;
        return previous < 0 || nodes[previous].tagName !== "br";
      });
    }
    walk(tree);
  };
}
