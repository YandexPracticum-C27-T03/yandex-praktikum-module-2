export function scrollTo(node: HTMLDivElement, offset: HTMLElement['offsetTop']) {
  requestAnimationFrame(() => {
    node.scrollTo({ top: offset });
  });
}
