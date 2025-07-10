// lib/swagger.js
import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'pages/api/mock',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'teste de API Mock Coffe',
        version: '1.0',
        description: 'Documentação da API criada Swagger.',
      },
    },
  });
  return spec;
};