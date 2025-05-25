export const countrySwagger = {
    '/api/country': {
        get: {
            tags: ['Country'],
            description: 'Returns a list of all countries',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of countries',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id_hash: { type: 'string', format: 'uuid' },
                                        name: { type: 'string' },
                                        code: { type: 'string' },
                                        created_at: { type: 'string', format: 'date-time' },
                                        updated_at: { type: 'string', format: 'date-time' },
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
        post: {
            tags: ['Country'],
            description: 'Creates a new country',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['name', 'code'],
                            properties: {
                                name: { type: 'string', example: 'Azerbaijan' },
                                code: { type: 'string', example: 'AZ' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Country created',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id_hash: { type: 'string' },
                                            name: { type: 'string' },
                                            code: { type: 'string' },
                                            created_at: { type: 'string' },
                                            updated_at: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },

    '/api/country/{id_hash}': {
        get: {
            tags: ['Country'],
            description: 'Get country by ID hash',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id_hash',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'Country found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id_hash: { type: 'string' },
                                    name: { type: 'string' },
                                    code: { type: 'string' },
                                    created_at: { type: 'string' },
                                    updated_at: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Country not found or bad ID',
                },
            },
        },

        put: {
            tags: ['Country'],
            description: 'Update an existing country by ID hash',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id_hash',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                code: { type: 'string' },
                            },
                        },
                    },
                },
            },
            responses: {
                204: {
                    description: 'Country updated successfully (no content returned)',
                },
                400: {
                    description: 'Invalid input or country not found',
                },
            },
        },

        delete: {
            tags: ['Country'],
            description: 'Delete a country by ID hash',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id_hash',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'Country deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    status: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Country not found',
                },
            },
        },
    },

    '/api/countries/get-filterable-columns-data': {
        get: {
            tags: ['Country'],
            description: 'Returns filterable column values for Country (e.g., name and code)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Filterable fields with values',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        field: { type: 'string' },
                                        values: {
                                            type: 'array',
                                            items: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                500: { description: 'Server error' },
            },
        },
    },
};
