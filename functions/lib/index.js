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
exports.adminProfile = functions.database.ref('/userProfile/{profile}/role').onUpdate((event) => {
    const user = event.data.val(); // The Firebase user.
    const uid = event.key;
    let customClaims = { admin: false };
    if (user.role === 'admin') {
        customClaims = { admin: true };
    }
    return admin.auth().setCustomUserClaims(uid, customClaims)
        .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = admin.database().ref("metadata/" + uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({ refreshTime: new Date().getTime() });
    })
        .catch(error => {
        console.log(error);
    });
});
//# sourceMappingURL=index.js.map