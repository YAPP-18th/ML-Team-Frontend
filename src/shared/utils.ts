export function camel2Under(s: string) {
  let r = '';

  if (s !== undefined && s !== null) {
    const sp = s.split(/(?=[A-Z])/);
    r = sp.join('_').toLowerCase();
  }

  return r;
}
