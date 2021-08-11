"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
exports.__esModule = true;
var express = require('express');
var fs = require('fs');
var router = express.Router();
var pg = require("./database");
router.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log("Hello from get " + id);
                return [4 /*yield*/, pg.query("SELECT * FROM  users,customer,role where users.uid=" + id + " and users.uid=customer.cid and users.uid=role.rid order by uid;", function (err, result) {
                        if (err)
                            console.log("Error");
                        else {
                            console.log(result.rows);
                            res.status(200).json(result.rows);
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pg.query('SELECT * FROM  users,customer,role where users.uid=customer.cid and users.uid=role.rid order by uid;', function (err, result) {
                    if (err)
                        console.log("Error");
                    else {
                        res.status(200).json(result.rows);
                    }
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, queryResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body;
                console.log("In post");
                return [4 /*yield*/, pg.query("INSERT INTO users(UId,First_Name,Middle_Name,Last_Name,Email,Phone_Number,Role,Address,createdOn) VALUES (" + user.uid + ",'" + user.fname + "', '" + user.mname + "','" + user.lname + "','" + user.email + "','" + user.phonenumber + "','" + user.role + "','" + user.address + "',now());\n    INSERT INTO role(rid,rname,key,description) VALUES (" + user.uid + ",'" + user.rname + "', '" + user.key + "','" + user.description + "');\n    INSERT INTO customer(CName,Website,CAddress,CId) VALUES ('" + user.cname + "', '" + user.website + "','" + user.caddress + "','" + user.uid + "');", function (err, result) {
                        if (err) {
                            res.status(404).send("Error in executing query");
                        }
                        else {
                            res.send("Updated");
                        }
                    })];
            case 1:
                queryResult = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router["delete"]('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, pg.query("DELETE FROM role WHERE rid=" + id + ";\n    DELETE FROM Customer WHERE cid=" + id + ";\n    DELETE FROM users WHERE UId=" + id + ";", function (err, result) {
                        if (err)
                            console.log("Error");
                        else {
                            console.log("Deleted");
                            res.status(200).send("Successfully deleted");
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.patch('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, user, queryResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body;
                return [4 /*yield*/, pg.query("UPDATE users SET First_Name='" + user.fname + "',\n        Middle_Name='" + user.mname + "',Last_Name='" + user.lname + "',Email='" + user.email + "',\n        Phone_Number='" + user.phonenumber + "',Role='" + user.role + "',Address='" + user.address + "'\n        WHERE UId=" + id + ";\n        UPDATE customer SET CName='" + user.cname + "',Website='" + user.website + "',\n        CAddress='" + user.caddress + "' WHERE CId=" + id + ";\n\n        UPDATE role SET rname='" + user.rname + "',key='" + user.key + "',description='" + user.description + "' WHERE rid=" + id + ";\n        \n        ", function (err, result) {
                        if (err) {
                            console.log("error");
                            res.status(404).send("Error in updating");
                        }
                        else {
                            console.log("updated");
                            res.send("Updated");
                        }
                    })];
            case 1:
                queryResult = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
