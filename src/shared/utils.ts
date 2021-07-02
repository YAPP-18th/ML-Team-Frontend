export function camel2Snake(s: string): string {
  const sp = s?.split(/(?=[A-Z])/);
  return sp?.join('_')?.toLowerCase() || '';
}

export function snake2Camel(s: string): string {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

export function getRequestObj(req: { [key: string]: any }) {
  return Object.keys(req).reduce(
    (acc, cur) => ({
      ...acc,
      [camel2Snake(cur)]: req[cur],
    }),
    {},
  );
}

export function getResponseObj(res: { [key: string]: any }) {
  return Object.keys(res).reduce(
    (acc, cur) => ({
      ...acc,
      [snake2Camel(cur)]: res[cur],
    }),
    {},
  );
}
