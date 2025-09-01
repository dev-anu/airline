import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(express.json());

/** Swagger setup (auto-generates from JSDoc comments) */
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Trimph API",
      version: "1.0.0",
      description: "Airline apis"
    },
    servers: [{ url: "http://localhost:5000" }]
  },
  // scan this file (and future route files) for JSDoc @openapi blocks
  apis: ["./src/**/*.ts"]
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
  console.log(`Swagger UI on http://localhost:${PORT}/docs`);
});
