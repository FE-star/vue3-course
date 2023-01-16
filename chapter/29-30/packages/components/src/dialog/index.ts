import { createApp, h } from 'vue';
import type { Component } from 'vue';
import { DialogComponent } from './dialog';

function createDialog(params: {
  text?: string;
  Content?: Component;
  onOk?: () => void;
  hideFooter?: boolean;
}) {
  const dom = document.createElement('div');
  const body = document.querySelector('body') as HTMLBodyElement;
  body.appendChild(dom);
  const app = createApp({
    render() {
      return h(DialogComponent, {
        text: params.text,
        Content: params.Content,
        onOnOk: params.onOk,
        hideFooter: params.hideFooter
      });
    }
  });
  app.mount(dom);

  return {
    close: () => {
      app.unmount();
      dom.remove();
    }
  };
}

const Dialog: { createDialog: typeof createDialog } = {
  createDialog
};

export default Dialog;
