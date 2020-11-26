import React from "react";
import md5 from "md5";
import { INode, INodeId } from "../types/mindmap";

export function handlePropagation(event: React.MouseEvent): void {
  event.stopPropagation();
  event.preventDefault();
}

export function findNode(node: INode, search_id: INodeId): INode {
  if (!node) return null;
  if (node.id === search_id) {
    return node;
  }
  return node.children
    .map((child) => findNode(child, search_id))
    .find((item) => item);
}

export function deepCopy<T>(input: T): any {
  if (input instanceof Object) {
    if (Array.isArray(input)) {
      return input.map(deepCopy);
    }
    let output = {};
    Object.keys(input).forEach((key) => {
      output[key] = deepCopy(input[key]);
    });
    return output;
  }
  return input;
}

export function debounce(fn: Function, wait: number) {
  let timer = null;
  return function (...props) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, props);
    }, wait);
  } ;
}

export function setShowChildrenTrue(node: INode): void {
  if (!node) return;
  node.showChildren = true;
  if (node.children) {
    node.children.map((child) => setShowChildrenTrue(child));
  }
}

export function generateRandom(): string {
  return md5("" + Date.now() + Math.random());
}
