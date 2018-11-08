import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.createProfile = functions.auth.user()
  .onCreate((userRecord, context) => {
    admin.auth().getUser(userRecord.uid)
      .then(function(userData) {
        console.log("Successfully fetched user data:", userData.toJSON());
        return admin.database().ref(`/userProfile/${userData.uid}`).set({
          email: userData.email,
          name: userData.displayName,
          role: "user"
        });
      })
      .catch(function(error) {
        console.log("Error fetching user data:", error);
      });
  });
