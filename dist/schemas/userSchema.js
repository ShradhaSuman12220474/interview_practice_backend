"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// 2️⃣ Define the Mongoose schema
const userSchema = new mongoose_1.Schema({
    //  _id: {
    //   type: String,
    //   default: uuidv4, // ✅ auto-generate a UUID for every user
    //   unique: true,
    //   immutable: true, // prevents modification after creation
    // },
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: "Invalid email format",
        },
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
}, { timestamps: true });
// 3️⃣ Hash password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    // only hash if password is new or modified
    if (!user.isModified("password"))
        return next();
    const SALT_ROUNDS = 9;
    const salt = await bcrypt_1.default.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt_1.default.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});
// 4️⃣ Create and export model
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=userSchema.js.map