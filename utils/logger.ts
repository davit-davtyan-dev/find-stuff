const MAIN_PREFIX = 'FIND_STUFF_LOGS';

export default class Logger {
  constructor(private context: string) {}

  private formatLog(args: any[]): any[] {
    if (__DEV__) {
      return [`[${this.context}]`, ...args];
    }

    return [
      MAIN_PREFIX,
      `[${new Date().toISOString()}]`,
      `[${this.context}]`,
      ...args,
    ];
  }

  log(...args: Array<any>) {
    console.log(...this.formatLog(args));
  }
}
