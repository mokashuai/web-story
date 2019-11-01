const test = ["0","1","2","3","1-0","1-0-0","1-0-1","1-0-1-0","1-0-1-1","1-0-2","1-1","1-1-0","1-1-0-0","1-1-0-0-0","1-1-0-0-0-0","1-1-0-0-0-1","1-1-0-0-1","1-1-0-1","1-1-1","1-2"];
const findRoads = (arr, start = '0', roads = []) => {
  if(!arr.length) return [];
  let cur = roads.length;
  const next = arr.find(layer => layer === `${start}-0`);
  if(next){
    if(!Array.isArray(roads[cur])){
      roads[cur] = [start];
    }
    roads[cur].push(next);
    const ele = findRoads(arr, next, roads[cur]);
    if(Array.isArray(roads[cur])){
      roads[cur].push(ele);
    }else{
      roads[cur] = [ele];
    }
  }else{
    let nextRootIndex = +start + 1 + '', nextRoot = arr.find(layer => layer === nextRootIndex);

    if(nextRoot){
      if(!Array.isArray(roads[cur])){
        roads[cur] = [nextRootIndex];
      }
      roads[cur].push(nextRoot);
    }else{
      return roads;
    }
  }
}

let curArr = [], a = ["0","1","2","3","1-0","1-0-0","1-0-1","1-0-1-0","1-0-1-1","1-0-2","1-1","1-1-0","1-1-0-0","1-1-0-0-0","1-1-0-0-0-0","1-1-0-0-0-1","1-1-0-0-1","1-1-0-1","1-1-1","1-2"];
let findOneLine = (start, arr, n = 0) => {
  if(curArr[n]){
    curArr[n].push(start);
  }else{
    curArr[n] = [start];
  }
  const next = arr.find(layer => layer === `${start}-${n}`);
  if(next){
    findOneLine(next, arr, n);
    let m = n + 1;
    if(arr.find(layer => layer === `${start}-${m}`)){
      const index = curArr[n].findIndex(e => e === start);
      curArr[m] = curArr[n].slice(0, index + 1);
      findOneLine(next, arr, m);
    }
  }else{
    let i = +start[0] + 1 + '';
    const index = arr.findIndex(layer => layer === i);
    if(~index){
      findOneLine(i, arr, n);
    }
  }
}

let b = {"0":{"taskIndex":"0","nextTaskIndex":"1","permissionList":"0","editable":false},"1":{"taskIndex":"1","nextTaskIndex":"2","permissionList":"1","editable":false},"2":{"taskIndex":"2","nextTaskIndex":"3","permissionList":"2","editable":false},"3":{"taskIndex":"3","nextTaskIndex":"null","permissionList":"3","editable":false},"1-0":{"taskIndex":"1-0","permissionList":"1-0","editable":false},"1-0-0":{"taskIndex":"1-0-0","nextTaskIndex":"1-0-1","permissionList":"1-0-0","editable":false},"1-0-1":{"taskIndex":"1-0-1","nextTaskIndex":"1-0-2","permissionList":"1-0-1","editable":false},"1-0-1-0":{"taskIndex":"1-0-1-0","permissionList":"1-0-1-0","editable":false},"1-0-1-1":{"taskIndex":"1-0-1-1","permissionList":"1-0-1-1","editable":false},"1-0-2":{"taskIndex":"1-0-2","nextTaskIndex":"2","permissionList":"1-0-2","editable":false},"1-1":{"taskIndex":"1-1","permissionList":"1-1","editable":false},"1-1-0":
{"taskIndex":"1-1-0","nextTaskIndex":"1-1-1","permissionList":"1-1-0","editable":false},"1-1-0-0":{"taskIndex":"1-1-0-0","permissionList":"1-1-0-0","editable":false},"1-1-0-0-0":{"taskIndex":"1-1-0-0-0","nextTaskIndex":"1-1-0-0-1","permissionList":"1-1-0-0-0","editable":false},"1-1-0-0-0-0":{"taskIndex":"1-1-0-0-0-0","permissionList":"1-1-0-0-0-0","editable":false},"1-1-0-0-0-1":{"taskIndex":"1-1-0-0-0-1","permissionList":"1-1-0-0-0-1","editable":false},"1-1-0-0-1":{"taskIndex":"1-1-0-0-1","nextTaskIndex":"1-1-1","permissionList":"1-1-0-0-1","editable":false},"1-1-0-1":{"taskIndex":"1-1-0-1","permissionList":"1-1-0-1","editable":false},"1-1-1":{"taskIndex":"1-1-1","nextTaskIndex":"2","permissionList":"1-1-1","editable":false},"1-2":{"taskIndex":"1-2","permissionList":"1-2","editable":false}}
let c = [{"nextTaskIndex":"1","permissionList":"0","id":"0","editable":false},{"nextTaskIndex":"2","permissionList":"1","id":"1","editable":false},{"nextTaskIndex":"3","permissionList":"2","id":"2","editable":false},{"nextTaskIndex":"null","permissionList":"3","id":"3","editable":true},{"permissionList":"1-0","id":"1-0","editable":false},{"nextTaskIndex":"1-0-1","permissionList":"1-0-0","id":"1-0-0","editable":false},{"nextTaskIndex":"1-0-2","permissionList":"1-0-1","id":"1-0-1","editable":false},{"permissionList":"1-0-1-0","id":"1-0-1-0","editable":false},{"permissionList":"1-0-1-1","id":"1-0-1-1","editable":false},{"nextTaskIndex":"2","permissionList":"1-0-2","id":"1-0-2","editable":false},{"permissionList":"1-1","id":"1-1","editable":true},{"nextTaskIndex":"1-1-1","permissionList":"1-1-0","id":"1-1-0","editable":false},
{"permissionList":"1-1-0-0","id":"1-1-0-0","editable":false},{"nextTaskIndex":"1-1-0-0-1","permissionList":"1-1-0-0-0","id":"1-1-0-0-0","editable":false},{"permissionList":"1-1-0-0-0-0","id":"1-1-0-0-0-0","editable":false},{"permissionList":"1-1-0-0-0-1","id":"1-1-0-0-0-1","editable":false},{"nextTaskIndex":"1-1-1","permissionList":"1-1-0-0-1","id":"1-1-0-0-1","editable":false},{"permissionList":"1-1-0-1","id":"1-1-0-1","editable":false},{"nextTaskIndex":"2","permissionList":"1-1-1","id":"1-1-1","editable":false},{"permissionList":"1-2","id":"1-2","editable":false}];
let d = [
  {"editable":false,"id":"0"},{"editable":false,"id":"1"},{"editable":false,"id":"2"},{"editable":false,"id":"3"},
  {"editable":false,"id":"1-0"},{"editable":false,"id":"1-0-0"},{"editable":false,"id":"1-0-1"},{"editable":false,"id":"1-0-1-0"},
  {"editable":false,"id":"1-0-1-1"},{"editable":false,"id":"1-0-2"},{"editable":true,"id":"1-1"},{"editable":false,"id":"1-1-0"},
  {"editable":false,"id":"1-1-0-0"},{"editable":true,"id":"1-1-0-0-0"},{"editable":false,"id":"1-1-0-0-0-0"},
  {"editable":false,"id":"1-1-0-0-0-1"},{"editable":false,"id":"1-1-0-0-1"},{"editable":false,"id":"1-1-0-1"},
  {"editable":false,"id":"1-1-1"},{"editable":false,"id":"1-2"},
];
const existEditable = (ary, id='taskIndex') => {
  const rest = [];
  const trunkMain = ary.filter(each => {
    if(each[id].length > 1){
      rest.push(each);
    }
    return each[id].length === 1;
  });
  if(!trunkMain.length || trunkMain.some(({editable}) => editable)) return true;

  const passCheck = (idx, arr) => {//当前通路通过校验
    if(!arr.length) return false;
    let childs = [];
    const trunkSub = arr.filter(each => {
      let flag = new RegExp(`^${idx}`).test(each[id]);
      if(!flag){
        childs.push(each);//余下的元素
      }
      return flag;
    });
    if(!trunkSub.length){//当前节点的下级节点组
      return false;
    }
    return trunkSub.every(({[id]: idx, editable}) => {
      let truthy = [];
      if(editable){
        truthy.push(each);
        childs = childs.filter(({[id]: ID}) => truthy.every(({[id]: idx}) => !new RegExp(`^${idx}`).test(ID)));
        return true;
      }
      return passCheck(idx, childs);
    });
  }

  return trunkMain.every(({[id]: idx}) => passCheck(idx, rest));//存在一条路全为false则结束
}
