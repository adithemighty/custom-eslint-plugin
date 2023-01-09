const ERROR_MESSAGE = "Consider using the Z_INDEX constant.";

const VALID_STRING_VALUES = [
  "auto",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];

const isValidVar = (node) => {
  // Handle valid string values
  if (node.type === "Literal" && VALID_STRING_VALUES.includes(node.value)) {
    return true;
  }

  // Handle undefined
  if (node.type === "Identifier" && node.name === "undefined") {
    return true;
  }

  return node.object && node.object.name === "Z_INDEX";
};

module.exports = {
  rules: {
    "prefer-z-index-constant": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Reminder to use Z_INDEX constant",
          category: ERROR_MESSAGE,
        },
      },

      create: function (context) {
        return {
          Identifier(node) {
            if (node.parent.type.startsWith("TS")) return;

            // We're only interested if the key is `zIndex`
            if (node.name === "zIndex") {
              const expression = node.parent.value;

              if (isValidVar(expression)) return;

              // Check for conditionals
              if (expression.type === "ConditionalExpression") {
                const leftIsValid = isValidVar(expression.consequent);
                const rightIsValid = isValidVar(expression.alternate);

                // If both options are valid don't report errors
                if (rightIsValid && leftIsValid) return;
              }

              return context.report({ node, message: ERROR_MESSAGE });
            }
          },
        };
      },
    },
  },
};
