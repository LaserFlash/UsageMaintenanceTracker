import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  public authState: Boolean = false;
  private user;
  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(data => {
      if (auth != null) {
        this.authState = true;
        this.user = db.object("userProfile/" + data.uid).valueChanges();
      }
      this.authState = false;
    });
  }

  public logout(){
      this.afAuth.auth.signOut();
  }

  public get role(): string {
    return this.user.role;
  }
}
