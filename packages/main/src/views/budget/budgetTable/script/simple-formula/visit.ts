import {
  BinaryExpressionNode,
  CellNode,
  CellRangeNode,
  FunctionNode,
  LogicalNode,
  NumberNode,
  TextNode,
  UnaryExpressionNode,
} from 'excel-formula-ast';
import { buildExcelColumnHeaderNameRange } from './utils';

export function visitBuild(node) {
  return visitNodeBuild(node);
}

function visitNodeBuild(node) {
  switch (node.type) {
    case 'cell':
      return visitCell(node);
    case 'cell-range':
      return visitCellRange(node);
    case 'function':
      return visitFunction(node);
    case 'number':
      return visitNumber(node);
    case 'text':
      return visitText(node);
    case 'logical':
      return visitLogical(node);
    case 'binary-expression':
      return visitBinaryExpression(node);
    case 'unary-expression':
      return visitUnaryExpression(node);
  }
}

function visitCell(node: CellNode) {
  return `#${node.key.trim().replace('[]', '')}#`;
}

function visitCellRange(node: CellRangeNode) {
  let left = visitNodeBuild(node.left);
  let right = visitNodeBuild(node.right);

  left = left.replace(/#/g, '');
  right = right.replace(/#/g, '');

  return `${buildExcelColumnHeaderNameRange(left, right)
    .map((x) => `#${x}#`)
    .join(',')}`;
}

function visitFunction(node: FunctionNode) {
  const args = node.arguments.map((arg) => visitNodeBuild(arg));

  node.name = node.name.trim();

  // 常用函数的优化
  if (node.name === 'IF') {
    return `(${args[0]} ? (${args[1]}) : (${args[2]}) )`;
  }
  if (node.name === 'AND') {
    return `(${args.map((x) => `(${x})`).join(' && ')})`;
  }
  if (node.name === 'OR') {
    return `(${args.map((x) => `(${x})`).join(' || ')})`;
  }

  return `this._${node.name}(${args.join(',')})`;
}

function visitNumber(node: NumberNode) {
  return node.value;
}

function visitText(node: TextNode) {
  return `"${node.value}"`;
}

function visitLogical(node: LogicalNode) {
  return node.value;
}

function visitBinaryExpression(node: BinaryExpressionNode) {
  const left = visitNodeBuild(node.left);
  const right = visitNodeBuild(node.right);

  node.operator = node.operator.trim();

  if (node.operator === '=') {
    return `((${left}) == (${right}))`;
  }
  if (node.operator === '<>') {
    return `((${left}) != (${right}))`;
  }
  if (node.operator === '&') {
    return `\`\${${left}}\${${right}}\``;
  }
  if (node.operator === '+') {
    return `(+${left}) + (+${right})`;
  }
  if (node.operator === '^') {
    return `(${left}) ** (${right})`;
  }
  return `(${left}) ${node.operator} (${right})`;
}

function visitUnaryExpression(node: UnaryExpressionNode) {
  const operand = visitNodeBuild(node.operand);
  return `(${node.operator}${operand})`;
}
