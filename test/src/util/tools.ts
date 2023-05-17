import cache from './cache';

export default {
  deepFind,
  deepFindPath,
  findFirstFileNode,
  deepTraversal,
  wideTraversal,
  findOptions,
  getLabelBykey,
  findColumnColorByLabel,
  filterData,
  findButtonsByDept,
  getDict,
};

// 查找指定元素(全路径)
export function deepFindPath(node, fn, result: any = []) {
  const treelist = node instanceof Array ? node : [node];
  for (let i = 0; i < treelist.length; i++) {
    if (fn(treelist[i])) {
      result.push(treelist[i]);
      return result;
    } else {
      const target = deepFindPath(treelist[i].children || [], fn, result);
      if (target) {
        result.push(treelist[i]);
        return result;
      }
    }
  }
}

// 查找指定元素
export function deepFind(node, fn) {
  const treelist = node instanceof Array ? node : [node];
  for (let i = 0; i < treelist.length; i++) {
    if (fn(treelist[i])) {
      return treelist[i];
    } else {
      const target = deepFind(treelist[i].children || [], fn);
      if (target) return target;
    }
  }
}

// 查找符合条件的第一个元素
export function findFirstFileNode(node, fn, result: any[] = []) {
  const treelist = node instanceof Array ? node : [node];
  for (let i = 0; i < treelist.length; i++) {
    if (fn(treelist[i])) result.push(treelist[i]);
    treelist[i].children && findFirstFileNode(treelist[i].children, fn, result);
  }
  return result[0];
}

// 深度优先遍历
export function deepTraversal(node, fn, result: any[] = []) {
  const treelist = node instanceof Array ? node : [node];
  for (let i = 0; i < treelist.length; i++) {
    if (fn ? fn(treelist[i]) : true) result.push(treelist[i]);
    treelist[i].children && deepTraversal(treelist[i].children || [], fn, result);
  }
  return result;
}

// 广度优先遍历
export function wideTraversal(node, fn, result: any[] = []) {
  const treelist = node instanceof Array ? node : [node];
  const array: any[] = [];
  for (let i = 0; i < treelist.length; i++) {
    if (fn ? fn(treelist[i]) : true) result.push(treelist[i]);
    treelist[i].children && array.push(...treelist[i].children);
    treelist.length === i + 1 && wideTraversal(array, fn, result);
  }

  return result;
}

export function formatTree(treeData) {
  return treeData.map((data) => {
    return {
      id: data.id,
      label: data.label,
      value: data.value,
      category: data.category,
      ...(data?.children?.length && { children: formatTree(data.children) }),
    };
  });
}

/**
 * 获取字典
 * @param code constant.js中dicts字段中的code值
 * @returns [{label:'',value:''}]
 * 示例: getDict('flowStatus')
 */
export function getDict(code: string) {
  const dictId = window.constants.dicts.find((item) => item.code === code)?.category;
  const dicts = cache.getCache('dicts', 'session');
  const dictList = dicts === '' ? [] : dicts;
  return dictList.find((item) => item.category === dictId)?.children || [];
}

// 通过字段判断是否存在按钮权限(或者菜单权限)
export function isAuth(fieldValue: any, fieldName = 'code') {
  const dicts = cache.getCache('menuList', 'session');
  if (!dicts) return false;
  const target = deepFind(dicts, (item) => item[fieldName] === fieldValue);
  return !!target;
}

// 根据字典获取高级筛选选项列表
export function findOptions(category: string, filterList?: string[]) {
  const dicts = cache.getCache('dicts', 'session');
  const target = deepFind(dicts, (item) => item.category === category);
  const list = target?.children || [];
  const optionList: any = [];
  if (filterList) {
    filterList.forEach((label) => optionList.push(list.find((item) => item.label === label)));
  }
  return filterList ? optionList : list;
}

// 通过value查找字典对应的label
export function getLabelBykey(code: string, key: string, deptCategory?) {
  const dicts = cache.getCache('dicts', 'session');
  const category = deptCategory ? `${code}_${deptCategory}` : code;
  const target = deepFind(dicts, (item) => item.category === category && item.value === key);
  // console.log(code, key, category);
  return target?.label || '';
}

// 查找表格列对应的颜色值
export function findColumnColorByLabel(category, value) {
  const target = window.constants.columnColor.find((item) => item.category === category && item.value === value);
  return target?.color;
}

/**
 * 根据字段映射关系过滤数据
 * @param condition 筛选条件对象 如{ a:1, b:2 }
 * @param data 原始数据 如[{ aX:1, bX:2 },{ aX:3, bX:2 }]
 * @param fieldMap 检索字段与列表中的数据字段的映射关系 如 { a:{ name:'aX', exact: true //是否精确匹配}, b: 'bX' }
 * @returns []
 */
// filterData(
// { a: 1, b: '22' },
// [
//   { aX: 1, bX: '223' },
//   { aX: 1, bX: 32 },
//   { aX: 1, bX: true },
// ],
// { a: 'aX', b: { name: 'bX', exact: false } },
// );
export function filterData(condition: {}, data: any[], fieldMap?: {}) {
  const res = Object.keys(condition)
    .filter((c) => condition[c])
    .reduce((p, c) => {
      return p.filter((item) => {
        if (fieldMap && Object.keys(fieldMap).length > 0) {
          if (typeof fieldMap[c] === 'object') {
            const { name, exact } = fieldMap[c];
            if (exact) return item[name] === condition[c];
            if (typeof item[name] === 'string') return item[name].indexOf(condition[c]) > -1;
          }
        } else {
          return item[c].indexOf(condition[c]) > -1;
        }
        return item[fieldMap[c]] === condition[c];
      });
    }, data);
  // console.info(res);
  return res;
}

// 根据菜单获取需要的按钮
export function findButtonsByDept(pageCode: string, filterList?: any[]) {
  const menuList = cache.getCache('menuList', 'session');
  const target = deepFind(menuList, (item) => item.code === pageCode);
  const list = target?.children || [];
  const buttonList: any = [];
  if (filterList) {
    filterList.forEach((item) => buttonList.push(list.find((subItem) => subItem.code === item.code)));
  }
  return filterList ? buttonList : list;
}

// calcEffectScore('B', 'Infinity,-2;2,-1;1,0&Infinity,-3;3,-2;2,-1;1,0', undefined, 5, 1, 1);
// calcEffectScore('B', '100,-0.3;80,-0.6;60,-1', 100, 1);
// calcEffectScore('B', '100,-2.5', 90, 2.5);
// calcEffectScore('B', '1000,-0.7;0.901,0', 0.91, 0.7);
// calcEffectScore('C', '-1:0', undefined, 1, 2);
// calcEffectScore('D', '1>2>3,0,-1', undefined, 1, 20, 21, 1);
// 计算关键成效的最终得分
export function calcEffectScore(type: string, formula: string, effectX: any, y: any, ...rest) {
  let finalScore = Number(y);
  switch (type) {
    case 'A':
      if (formula === 'XY') finalScore = Number(effectX) * Number(y);
      break;
    case 'B':
      {
        const ranges = formula?.split('&') || [];
        if (effectX) {
          const deductScoreRanges = ranges[0]?.split(';').reverse() || [];
          for (let i = 0; i < deductScoreRanges.length; i++) {
            const [range, score] = deductScoreRanges[i]?.split(',');
            if (Number(effectX) < Number(range)) {
              finalScore += Number(score);
              break;
            }
          }
        } else {
          ranges.forEach((r, index) => {
            const dsr = r?.split(';');
            dsr.forEach((d) => {
              const [range, score] = d?.split(',');
              const maxValue: number = range === 'Infinity' ? Infinity : Number(range);
              if (rest[index] > maxValue) {
                finalScore += Number(score);
              }
            });
          });
        }
      }
      break;
    case 'C':
      {
        const param = rest[0];
        const [yesScore, noScore] = formula?.split(':');
        const score = param === 1 ? Number(yesScore) : Number(noScore);
        finalScore += score;
      }
      break;
    case 'D':
      {
        const [condition, res1, res2] = formula.split(',');
        const conditionLen: any = condition?.split('>');
        let flag = true;
        for (let j = 0; j < conditionLen.length - 1; j++) {
          if (rest[+conditionLen[j] - 1] > rest[+conditionLen[j]]) {
            flag = flag && true;
          } else {
            flag = flag && false;
            break;
          }
        }
        const score = flag ? Number(res1) : Number(res2);
        finalScore += score;
      }
      break;
    default:
      break;
  }
  return finalScore < 0 ? 0 : finalScore;
}

export function unique(arr): any {
  return [...new Set(arr)];
}

/**
 * 获取树菜单parent key
 * @param {*} key
 * @param {*} tree
 * @returns
 */
export const getParentKey = ({ trees, value, keys = [] }: { trees: any[]; value: string[]; keys?: string[] }) => {
  trees?.forEach((tree) => {
    if (tree.children) {
      tree.children.forEach((_children) => {
        if (value.indexOf(_children.key) > -1) {
          keys.push(tree.key);
        }
      });
      return getParentKey({ trees: tree.children, value, keys });
    }
  });
  return keys;
};
/**
 * 遍历树获取满足条件数据
 * @param {*} tree
 * @returns
 */

export const filterTree = ({ trees, value, keys = [] }: { trees: any[]; value: string; keys?: string[] }) => {
  trees?.forEach((tree) => {
    if (tree.title.indexOf(value) > -1) {
      keys.push(tree.key);
    }
    if (tree.children) return filterTree({ trees: tree.children, value, keys });
  });
  return keys;
};
/**
 * 树节点添加属性
 * @param tree
 * @param callback
 * @returns
 */
export const addAttrToNodes = (tree, callback: Function) => {
  tree.forEach((item) => {
    callback(item);
    if (item.children && item.children.length > 0) {
      addAttrToNodes(item.children, callback);
    }
  });
  return tree;
};

/**
 * 移动数组某个元素到指定位置
 * @param arr
 * @param a
 * @param b
 */
export const moveInArray = (arr, from, to) => {
  // 确保是有效数组
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    throw new Error('Please provide a valid array');
  }

  // 删除当前的位置
  const item = arr.splice(from, 1);

  // 确保还剩有元素移动
  if (!item.length) {
    throw new Error('There is no item in the array at index ' + from);
  }

  // 移动元素到指定位置
  arr.splice(to, 0, item[0]);
  return arr;
};
