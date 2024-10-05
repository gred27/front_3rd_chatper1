import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  const $el = document.createElement(vNode.type);

  updateAttributes($el, vNode.props ?? {});

  $el.append(...vNode.children.map(createElement__v2));

  return $el;
}



function updateAttributes($el, props) {
  Object.entries(props).forEach(([attr, value]) => {
    if (attr.startsWith('on') && typeof value === 'function') {
      const eventType = attr.toLowerCase().slice(2);
      addEvent($el, eventType, value);
    } else if (attr === 'className') {
      $el.setAttribute('class', value);
    } else {
      $el.setAttribute(attr, value);
    }
  });
}
