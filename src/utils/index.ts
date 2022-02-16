//utils.js

export const getSrc = (name: string) => {
  const path = `/src/assets/images/${name}`;
  const modules = import.meta.globEager("/src/assets/images/*");
  return modules[path].default;
};

export const deepClone = (source: any, target: any = {}) => {
  for (const key in source) {
    // Object.prototype.toString.call(source) === "[object Object]"|"[object Array]"
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const element = source[key];
      if (typeof element !== "object") {
        target[key] = element;
      } else {
        target[key] = target[key] || {};
        deepClone(target[key], element);
      }
    }
  }
  return target;
};

// 添加日期范围
export function addDateRange(params: any, dateRange: any) {
  const search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && "" != dateRange) {
    search.beginTime = dateRange[0];
    search.endTime = dateRange[1];
  }
  return search;
}
