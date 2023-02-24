import { nextTick, toRaw } from 'vue';
import type { App, Plugin } from 'vue';

const imageQueueList: {
  elem: HTMLImageElement;
  src: string;
  isLoaded: boolean;
}[] = [];
let container: HTMLElement | null = null;

function loadDisplayImage() {
  if (!container) {
    return;
  }
  const containerRect: DOMRect = container?.getBoundingClientRect() as DOMRect;
  for (let i = 0; i < imageQueueList.length; i++) {
    const item = imageQueueList[i];
    if (item.isLoaded === true) {
      continue;
    }
    const rect = item.elem.getBoundingClientRect();
    const imageOffsetContainerTop = rect.y - containerRect.y;
    if (
      imageOffsetContainerTop > 0 &&
      imageOffsetContainerTop < container?.clientHeight
    ) {
      item.elem.setAttribute('src', item.src);
      item.isLoaded = true;
    }
  }
}

function handleWheelEvent() {
  loadDisplayImage();
}

function listenScroll() {
  container?.addEventListener('wheel', handleWheelEvent);
}

const LazyloadPlugin: Plugin = {
  install(app: App) {
    app.directive('lazy-src', {
      beforeMount(el, binding) {
        imageQueueList.push({
          elem: el as HTMLImageElement,
          src: toRaw(binding?.value) as unknown as string,
          isLoaded: false
        });
      }
    });
    app.directive('lazy-container', {
      beforeMount(el) {
        container = el;
      }
    });
    nextTick(() => {
      if (container) {
        listenScroll();
        loadDisplayImage();
      }
    });
  }
};

export default LazyloadPlugin;
