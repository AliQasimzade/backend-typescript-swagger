export const rightsSwagger = {
  '/api/rights': {
    get: {
      description: 'Returns a list of all rights available in the system.',
      tags: ['Rights'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of rights',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    value_hash: { type: 'string', format: 'uuid' },
                    display_text: { type: 'string' },
                    key: { type: 'string', enum: ['view', 'full'] },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};
