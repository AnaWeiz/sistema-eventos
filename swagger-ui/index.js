const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Swagger UI centralizado rodando em http://localhost:${PORT}/docs`);
});
