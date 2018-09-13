import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationService {
  public authState: Boolean = false;
  private user;
  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(data => {
      if (auth != null) {
        this.authState = true;
        db.object("userProfile/" + data.uid)
          .valueChanges()
          .subscribe(userProfile => {
            this.user = userProfile;
          });
      }
      this.authState = false;
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public isAdmin(): Boolean {
    if (!this.user){ return false;}
    return this.user.role === "admin";
  }
}
