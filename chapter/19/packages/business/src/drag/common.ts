export const DRAG_CONTEXT_KEY = 'drag-context-key';

export const DRAG_DOM_ATTR_NAME = 'data-drag-item';

export interface DragContext {
  activeIndex: number;
  dragToIndex: number;
}

export const getElementIndex = (elem: HTMLElement | null) => {
  let ele: HTMLElement | null = elem;
  let index = 0;
  if (!ele || !ele.parentNode) {
    return -1;
  }
  ele = ele.previousElementSibling as HTMLElement | null;
  while (ele) {
    index++;
    ele = ele.previousElementSibling as HTMLElement | null;
  }
  return index;
};

export const getDraggingElement = (elem: HTMLElement | undefined) => {
  if (!elem || !elem?.parentElement) {
    return null;
  }
  let ele: HTMLElement | null = elem;
  ele = ele.parentElement;
  while (ele) {
    if (ele.getAttribute(DRAG_DOM_ATTR_NAME) === 'yes') {
      break;
    }
    ele = ele.parentElement;
  }
  return ele;
};
