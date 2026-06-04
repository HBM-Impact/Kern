const map = new WeakMap<WeakKey, string>();
let index = 0;

export const weakKey = (obj: WeakKey): string => {
  let key = map.get(obj);

  if (!key) {
    key = `weakKey-${index++}`;
    map.set(obj, key);
  }
  return key;
};
