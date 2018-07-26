function checkParents(node, nodeTest, parentTest, messageKey) {
  if (node.selector.indexOf(nodeTest) >= 0) {
    var n = node;
    while(n.parent) {
      n = n.parent;
      if (!n.selector) {
        break;
      }
      if (n.selector.indexOf("#{$") >= 0) {
        break;
      }
      if (n.selector.indexOf(parentTest) >= 0) {
        return {
          node: node,
          messageKey: messageKey
        };
      }
    }
  }
}

module.exports = {
  elementsInElements: function (node) {
    return checkParents(node, "&__", "&__", "rejectedElements");
  },

  modifiersInModifiers: function (node) {
    return checkParents(node, "&--", "&--", "rejectedModifiers");
  },

  elementsInModifiers: function (node) {
    return checkParents(node, "&__", "&--", "rejectedModifiersElements");
  }
};
