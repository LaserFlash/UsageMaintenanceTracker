"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createProfile = functions.auth.user()
    .onCreate((userRecord, context) => {
    return admin.database().ref(`/userProfile/${userRecord.uid}`).set({
        email: userRecord.email,
        name: userRecord.displayName,
        role: "user"
    });
});
//# sourceMappingURL=index.js.map