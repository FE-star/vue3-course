declare module '@my/work-front/dist/ssr/index.js' {
  export const getPageSSRData: (name: string) => { Page: unknown; css: string };
}
