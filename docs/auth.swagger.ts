export const authSwagger = {
    '/api/auth/register': {
        post: {
            tags: ['Auth'],
            description: 'Registers a new user.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'password'],
                            properties: {
                                username: { type: 'string', example: 'testuser' },
                                password: { type: 'string', example: '12345678' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User created but awaiting admin approval.',
                },
                400: {
                    description: 'Username exists or invalid input.',
                },
                500: {
                    description: 'Internal server error.',
                },
            },
        },
    },

    '/api/auth/login': {
        post: {
            tags: ['Auth'],
            description: 'Logs in a user and returns a JWT token.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'password'],
                            properties: {
                                username: { type: 'string', example: 'admin' },
                                password: { type: 'string', example: 'admin123' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Login successful.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: { type: 'string' },
                                    token_type: { type: 'string', example: 'Bearer' },
                                    expiry_time: { type: 'number', example: 3600 },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid credentials or deactivated user.',
                },
                500: {
                    description: 'Internal server error.',
                },
            },
        },
    },

    '/api/auth/UpdateStatus/{id_hash}/{status}': {
        patch: {
            tags: ['Auth'],
            description: 'Activates or deactivates a user by ID hash.',
            parameters: [
                {
                    name: 'id_hash',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                    description: 'Hashed user ID.',
                },
                {
                    name: 'status',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', enum: ['true', 'false'] },
                    description: 'User activation status (true or false).',
                },
            ],
            responses: {
                200: {
                    description: 'User status updated.',
                },
                400: {
                    description: 'Invalid ID or status.',
                },
                500: {
                    description: 'Internal server error.',
                },
            },
        },
    },

    '/api/users': {
        get: {
            tags: ['Auth'],
            description: 'Returns all users (passwords excluded).',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of users.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id_hash: { type: 'string', format: 'uuid' },
                                        username: { type: 'string' },
                                        role: { type: 'string' },
                                        isActive: { type: 'boolean' },
                                        createdAt: { type: 'string', format: 'date-time' },
                                        updatedAt: { type: 'string', format: 'date-time' },
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error.',
                },
            },
        },
    },
};
