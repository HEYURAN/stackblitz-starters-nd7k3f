type MiddlewareFn = (data: any) => any;

function middleware1(data: any): any {
  // 处理逻辑1
  return data;
}

function middleware2(data: any): any {
  // 处理逻辑2
  return data;
}

function compose(...middlewares: MiddlewareFn[]): MiddlewareFn {
  return (data: any) => {
    return middlewares.reduce((result, middleware) => {
      return middleware(result);
    }, data);
  };
}

function getwebpara(env: Env, url: string, middleware?: MiddlewareFn) {
  if (isLocalEnv(env)) {
    return getLocalData();
  }

  return fetchObs$(domain + url).pipe(
    mergeMap((response: WebParaResponse) => {
      const { paraInfoParmas, theme, in18, sumFiles, messageConfig } = response;

      let processedData = response;

      if (middleware) {
        processedData = middleware(response);
      }

      return of({ type: 'save_para', payload: processedData });
    })
  );
}

function getparaInfo(url: string, env: Env, middleware?: MiddlewareFn) {
  let data: unknown = null;

  if (isLocalEnv(env)) {
    data = getLocalinfoData();
    return of({ type: 'save_info', payload: data });
  }

  let obs$ = fetchObs$(domain + url).pipe(
    mergeMap((response: any) => {
      let processedData = response;

      if (middleware) {
        processedData = middleware(response);
      }

      return of({ type: 'save_info', payload: processedData });
    })
  );

  return obs$;
}

function init(env: Env, middleware?: MiddlewareFn) {
  const config = ConfigFactory.createConfig(env);
  const domain = config.getDomain();
  const webparaURL = config.getWebparaURL();
  const paraInfoURL = config.getParaInfoURL();

  const composedMiddleware = compose(middleware1, middleware2);

  // rxjs
  const obs$: Observable<IAction> = getwebpara(
    env,
    webparaURL,
    composedMiddleware
  );
  const obs2$: Observable<IAction> = getparaInfo(
    paraInfoURL,
    env,
    composedMiddleware
  );
  const obs3$: Observable<IAction> = getparaInfo(
    paraInfoURL,
    env,
    composedMiddleware
  );
  // ... some other function get Observable

  return concat(obs$, obs2$, obs3$ /*, obs4$, ...*/);
}
