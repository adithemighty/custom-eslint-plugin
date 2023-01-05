const Z_INDEX = {
  BODY: 0,
  NOTIFICATION: 1,
};

// Valid
export const styleConstant = {
  zIndex: Z_INDEX.NOTIFICATION,
};

export const styleValidString = {
  zIndex: "unset",
};

export const validConditionalStyle = ({ isActive }) => ({
  zIndex: isActive ? Z_INDEX.BODY : Z_INDEX.NOTIFICATION,
});

export const invalidConditionalStyle = ({ isActive }) => ({
  zIndex: isActive ? undefined : Z_INDEX.NOTIFICATION,
});

// Invalid
export const styleNegativeNumber = {
  zIndex: -1,
};

export const styleNumber = {
  zIndex: 99999,
};
