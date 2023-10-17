/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command, Flags, Interfaces } from '@oclif/core';

const formatAttrs = (obj: { [k: string]: string } = {}, prefix = '') => {
  return Object.fromEntries(
    Object.keys(obj).map((key: string) => {
      return [[prefix, key].join('.'), obj[key]];
    })
  );
};

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof BaseCommand)['baseFlags'] & T['flags']
>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {};

  protected flags!: Flags<T>;
  protected args!: Args<T>;

  public async init(): Promise<void> {
    await super.init();
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    });
    this.flags = flags as Flags<T>;
    this.args = args as Args<T>;
  }

  async _run() {
    let err;
    let result;
    try {
      // remove redirected env var to allow subsessions to run autoupdated client
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.removeEnvVar('REDIRECTED');
      await this.init();

      result = await this.run();
    } catch (error: any) {
      err = error;
      await this.catch(error);
    } finally {
      await this.finally(err);
    }
    if (result && this.jsonEnabled()) this.logJson(this.toSuccessJson(result));
    return result;
  }

  protected async catch(err: Error & { exitCode?: number }): Promise<any> {
    return super.catch(err);
  }

  protected async finally(_: Error | undefined): Promise<any> {
    return super.finally(_);
  }

}