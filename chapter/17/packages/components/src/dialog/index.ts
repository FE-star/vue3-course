import { createApp, h } from 'vue';
import { DialogComponent } from './dialog';

function createDialog(params: { text: string; onOk: () => void }) {
  const dom = document.createElement('div');
  const body = document.querySelector('body') as HTMLBodyElement;
  body.appendChild(dom);
  const app = createApp({
    render() {
      return h(DialogComponent, {
        text: params.text,
        onOnOk: params.onOk
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
