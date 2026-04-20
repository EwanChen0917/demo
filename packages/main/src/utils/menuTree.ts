export class TreeNode {
  constructor(data) {
    this.menuCode = data.menuCode;
    this.componentName = data.componentName;
    this.name = data.name;
    this.path = data.path;
    this.menuType = data.menuType;
    this.children = data.children ? data.children.map((child) => new TreeNode(child)) : [];
  }
}

export const findPathsFromRootToTarget = (root, target) => {
  const paths = [];

  function dfs(node, path) {
    if (!node) return;

    // 如果当前节点是目标节点，则保存路径
    if (node?.componentName === target) {
      paths.push(...path);
    }

    // 添加当前节点到路径中
    if (node?.name) {
      path.push(node.name);
    }

    // 遍历当前节点的所有子节点
    for (const child of node.children) {
      dfs(child, path);
    }

    // 回溯，移除当前节点
    path.pop();
  }

  dfs(root, []);
  return paths;
};
export const findPathsFromRootToTargetByCode = (root, target) => {
  const paths = [];

  function dfs(node, path) {
    if (!node) return;

    // 如果当前节点是目标节点，则保存路径
    if (node?.menuCode === target) {
      paths.push(...path);
    }

    // 添加当前节点到路径中
    if (node?.name) {
      path.push(node.name);
    }

    // 遍历当前节点的所有子节点
    for (const child of node.children) {
      dfs(child, path);
    }

    // 回溯，移除当前节点
    path.pop();
  }

  dfs(root, []);
  return paths;
};
export const arrayToTree = (array) => {
  return array.map((item) => new TreeNode(item));
};

export const getAllNodes = (tree, filter) => {
  const nodes = [];

  function collectNodes(node) {
    if (filter && filter(node))
      nodes.push({
        value: node?.name,
        componentName: node?.componentName,
        menuCode: node?.menuCode,
        path: node?.path,
        menuType: node?.menuType
      });
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => collectNodes(child));
    }
  }

  tree.forEach((node) => collectNodes(node));
  return nodes;
};

export const getMenuCodeByName = (tree, componentName) => {
  return getAllNodes(tree, (node) => node.componentName === componentName).map(
    (item) => item.menuCode
  );
};

const findFrameRoute = (menuCode, list, key) => {
  let foundMenu = null;
  list.forEach((menu) => {
    if (foundMenu) return;
    if (menu[key] === menuCode) {
      foundMenu = menu;
    } else if (menu.children) {
      const found = findFrameRoute(menuCode, menu.children, key);
      if (found) {
        foundMenu = found;
      }
    }
  });
  return foundMenu;
};

export const getMenu = (targetKey, menuList, key) => {
  return findFrameRoute(targetKey, menuList, key);
};
