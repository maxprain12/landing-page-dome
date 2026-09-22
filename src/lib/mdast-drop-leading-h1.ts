import { defineMdastPlugin } from "satteri";

/** Dome CMS may start the body with `# title`. The article layout already renders the h1. */
export const dropLeadingH1 = defineMdastPlugin({
  name: "drop-leading-h1",
  after(root, context) {
    const node = root.children[0];
    if (node?.type === "heading" && node.depth === 1) {
      context.removeNode(node);
    }
  },
});
