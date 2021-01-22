export default function queryWrapper<T>(func: (...params: any) => T) {
  return (_key: string, ...data: any) => func(...data);
}
