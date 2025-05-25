export const companyTypesSwagger = {
    '/api/company-types': {
        get: {
            description: 'Returns a list of all company types available in the system.',
            tags: ['CompanyTypes'],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of Company Types',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        value_hash: { type: 'string', format: 'uuid' },
                                        display_text: { type: 'string' },
                                        key: { type: 'string', enum: ['umumi', 'lab', 'analiz_3'] },
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
