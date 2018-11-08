"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createProfile = functions.auth.user()
    .onCreate((userRecord, context) => {
    admin.auth().getUser(userRecord.uid)
        .then(function (userData) {
        console.log("Successfully fetched user data:", userData.toJSON());
        return admin.database().ref(`/userProfile/${userData.uid}`).set({
            email: userData.email,
            name: userData.displayName,
            role: "user"
        });
    })
        .catch(function (error) {
        console.log("Error fetching user data:", error);
    });
});
//# sourceMappingURL=index.js.map