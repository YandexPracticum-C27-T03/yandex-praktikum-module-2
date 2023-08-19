export function scrollTo(node: HTMLDivElement, offset: number) {
  requestAnimationFrame(() => {
    node.scrollTop = offset + 1;
  });
}
