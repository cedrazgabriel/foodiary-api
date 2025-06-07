export abstract class Controller<TBody = undefined> {
  protected abstract handle(request: IController.Request): Promise<IController.Response<TBody>>;

  public execute(request: IController.Request): Promise<IController.Response<TBody>> {
    return this.handle(request);
  }
}

export namespace IController {
  export type Request<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParams;
  }

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  }

}
