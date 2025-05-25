export const modulesSwagger = {
  '/api/Module/GetUserModules': {
    get: {
      description: 'Returns a list of all modules the user has access to.',
      tags: ['Modules'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of modules',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id_hash: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    key: { type: 'string' },
                    icon: { type: 'string' },
                    display_order: { type: 'integer' },
                    description: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
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

  '/api/ModulePage/GetForUserByModuleId/{moduleIdHash}': {
    get: {
      description: 'Returns pages assigned to a specific module by its hashed ID.',
      tags: ['Modules'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'moduleIdHash',
          in: 'path',
          required: true,
          description: 'The hashed ID of the module',
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      responses: {
        200: {
          description: 'List of module pages',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    moduleId: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    key: { type: 'string' },
                    route: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid moduleIdHash parameter',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};
