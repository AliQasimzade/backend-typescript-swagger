export const districtSwagger = {
  "/api/district": {
    get: {
      tags: ["District"],
      description: "Returns a list of all districts",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of districts",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id_hash: { type: "string" },
                    name: { type: "string" },
                    country_name: { type: "string" },
                    country_id_hash: { type: "string" },
                    inserted_user: { type: "string" },
                    inserted_user_id_hash: { type: "string" },
                    is_deleted: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    post: {
      tags: ["District"],
      description: "Creates a new district",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "country_id_hash"],
              properties: {
                name: { type: "string", example: "Baku" },
                country_id_hash: { type: "string", example: "uuid-string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "District created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  status: { type: "integer" },
                },
              },
            },
          },
        },
        400: { description: "Bad request" },
      },
    },
  },

    "/api/districties/get-filterable-columns-data": {
    get: {
      tags: ["District"],
      description: "Returns filterable field values for districts",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Filterable values for each field",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string" },
                    values: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/api/district/{id_hash}": {
    get: {
      tags: ["District"],
      description: "Get district by ID hash",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id_hash",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "District found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id_hash: { type: "string" },
                  name: { type: "string" },
                  country_name: { type: "string" },
                  country_id_hash: { type: "string" },
                  inserted_user: { type: "string" },
                  inserted_user_id_hash: { type: "string" },
                  is_deleted: { type: "boolean" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
        400: { description: "Invalid ID or district not found" },
      },
    },
    put: {
      tags: ["District"],
      description: "Update an existing district",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id_hash",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                country_id_hash: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        204: {
          description: "District updated successfully (no content returned)",
        },
        400: {
          description: "Invalid input or district not found",
        },
      },
    },
    delete: {
      tags: ["District"],
      description: "Delete a district by ID hash",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id_hash",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "District deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  status: { type: "integer" },
                },
              },
            },
          },
        },
        400: {
          description: "District not found",
        },
      },
    },
  },



  "/api/district/update-status/{id_hash}/{isActive}": {
    patch: {
      tags: ["District"],
      description:
        "Updates the `is_deleted` status of a specific district identified by `id_hash`.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id_hash",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "isActive",
          required: true,
          schema: {
            type: "string",
            enum: ["true", "false"],
          },
        },
      ],
      responses: {
        200: {
          description: "District status updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  status: { type: "integer" },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid parameters",
        },
        401: {
          description: "Unauthorized - missing or invalid token",
        },
        404: {
          description: "District not found",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
};
