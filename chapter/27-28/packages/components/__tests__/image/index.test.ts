/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
import { describe, test, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { Image } from '../../src';

window.document.createElement = (function (create) {
  return function () {
    // @ts-ignore
    const element: HTMLElement = create.apply(this, arguments);
    if (element.tagName === 'IMG') {
      setTimeout(() => {
        const src = element.getAttribute('src');
        if (src?.includes('error.jpg')) {
          element.dispatchEvent(new CustomEvent('error', { bubbles: true }));
        } else {
          element.dispatchEvent(new CustomEvent('load', { bubbles: true }));
        }
      }, 100);
    }
    return element;
  };
})(window.document.createElement);

describe('Image', () => {
  test('load', async () => {
    let resolve: Function;
    let reject: Function;
    new Promise((res, rej) => ((resolve = res), (reject = rej)));
    mount(Image, {
      props: {
        src: './xxx/xxxx.jpg'
      },
      emits: {
        load: (e: Event) => {
          expect(e).toBeTruthy();
          resolve?.();
        },
        error: () => {
          reject?.();
        }
      }
    });
    await flushPromises();
  });

  test('error', async () => {
    let resolve: Function;
    let reject: Function;
    new Promise((res, rej) => ((resolve = res), (reject = rej)));
    mount(Image, {
      props: {
        src: './xxx/error.jpg'
      },
      emits: {
        load: () => {
          reject?.();
        },
        error: (e: Event) => {
          expect(e).toBeTruthy();
          resolve?.();
        }
      }
    });
    await flushPromises();
  });
});
