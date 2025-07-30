"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const server = (0, express_1.default)();
let app;
async function createNestServer(expressInstance) {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
        app.enableCors();
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Testing NestJS Swagger')
            .setDescription('Simple API with Swagger UI')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.init();
    }
    return app;
}
exports.default = async (req, res) => {
    await createNestServer(server);
    server(req, res);
};
//# sourceMappingURL=index.js.map