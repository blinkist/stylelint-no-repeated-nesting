var stylelint = require("stylelint");
var checkParents = require("./lib/check-parents");

var ruleName = "blinkist/no-repeated-nesting";
var messages = stylelint.utils.ruleMessages(ruleName, {
  rejectedElements: "There can't be elements nested in elements",
  rejectedModifiers: "There can't be modifiers nested in modifiers",
  rejectedModifiersElements: "There can't be elements nested in modifiers"
});


module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {

  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, {});
    if (!validOptions) { return }

    var parseTree = function(nodes) {
      if (!nodes) {
        return;
      }

      nodes.forEach(function(node) {
        if (!node || !node.selector) {
          return;
        }

        var tests = [
          checkParents.elementsInElements(node),
          checkParents.modifiersInModifiers(node),
          checkParents.elementsInModifiers(node)
        ];

        for (var i in tests) {
          if (tests[i]) {
            stylelint.utils.report({
              message: messages[tests[i].messageKey],
              ruleName: ruleName,
              result: postcssResult,
              node: tests[i].node,
            });
          }
        }

        parseTree(node.nodes);
      });
    }

    parseTree(postcssRoot.nodes);
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
