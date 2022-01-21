"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.WinCertificateStore = void 0;
var edge = require("edge-js");
var path = require("path");
var WinCertificateStore = /** @class */ (function () {
    function WinCertificateStore(params) {
        this.nativeCertFunction = edge.func(path.join(__dirname, '../resource/get_certs.csx'));
        this.params = this.prepareParams(params);
    }
    WinCertificateStore.prototype.getAllCertificates = function () {
        return this.nativeCertFunction(this.params, true);
    };
    WinCertificateStore.prototype.getCertificateByIssuer = function (issuer) {
        return __awaiter(this, void 0, void 0, function () {
            var certificates, promise, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        certificates = this.getAllCertificates();
                        promise = new Promise(function (resolve, reject) {
                            var e_1, _a;
                            try {
                                for (var certificates_1 = __values(certificates), certificates_1_1 = certificates_1.next(); !certificates_1_1.done; certificates_1_1 = certificates_1.next()) {
                                    var cert = certificates_1_1.value;
                                    if (cert.issuer.includes(issuer)) {
                                        resolve(cert);
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (certificates_1_1 && !certificates_1_1.done && (_a = certificates_1["return"])) _a.call(certificates_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WinCertificateStore.prototype.getCertificateBySubject = function (subject) {
        return __awaiter(this, void 0, void 0, function () {
            var certificates, promise, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        certificates = this.getAllCertificates();
                        promise = new Promise(function (resolve, reject) {
                            var e_2, _a;
                            try {
                                for (var certificates_2 = __values(certificates), certificates_2_1 = certificates_2.next(); !certificates_2_1.done; certificates_2_1 = certificates_2.next()) {
                                    var cert = certificates_2_1.value;
                                    var name_1 = cert.subject.replace("CN=", "");
                                    if (name_1 === subject) {
                                        resolve(cert);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (certificates_2_1 && !certificates_2_1.done && (_a = certificates_2["return"])) _a.call(certificates_2);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WinCertificateStore.prototype.prepareParams = function (params) {
        return {
            storeName: params.storeName || '',
            storeLocation: params.storeLocation || '',
            hasStoreName: Boolean(params.storeName),
            hasStoreLocation: Boolean(params.storeLocation)
        };
    };
    return WinCertificateStore;
}());
exports.WinCertificateStore = WinCertificateStore;
