module.exports = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },

    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: ['email', 'password'],
};
