import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

  exports.createProfile = functions.auth.user()
  .onCreate( (userRecord, context) => {
  return admin.database().ref(`/userProfile/${userRecord.uid}`).set({
    email: userRecord.email,
    name: userRecord.displayName,
    role: "user"
  });
});
