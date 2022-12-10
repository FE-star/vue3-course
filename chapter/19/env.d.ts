/// <reference types="vite/client" />

declare module 'process' {
  global {
    // eslint-disable-next-line no-var
    var process: NodeJS.Process;
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        NODE_ENV: 'development' | 'production';
        MYSQL_HOST: string;
        MYSQL_PORT: string;
        MYSQL_USER: string;
        MYSQL_PASSWORD: string;
        MYSQL_DATABASE: string;
      }
    }
  }
}
