"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const apiRouter_1 = __importDefault(require("./routers/apiRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/ping', (req, res) => {
    res.json({
        "success": true,
        "data": "Pong",
    });
});
app.use('/api', apiRouter_1.default);
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
    (0, dbConfig_1.default)();
});
//# sourceMappingURL=index.js.map