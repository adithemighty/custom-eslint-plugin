const ERROR_MESSAGE = "Consider using the Z_INDEX constant.";

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
            if (node.name === "zIndex") {
              if (
                node.parent.value.object &&
                node.parent.value.object.name === "Z_INDEX"
              )
                return;

              return context.report({ node, message: ERROR_MESSAGE });
            }
          },
        };
      },
    },
  },
};
