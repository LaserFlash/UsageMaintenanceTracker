import { Injectable } from '@angular/core';
import { Boat, BoatID } from './Utils/objects/boat';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class KnownBoatsService {
  private itemsCollection: AngularFirestoreCollection<Boat>;
  public boatInformation: BoatID[] = [];

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<Boat>('/boats', ref => ref.orderBy('name', 'asc'));
    let items: Observable<BoatID[]>;
    items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as BoatID;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );

    items.subscribe((doc) => {
      this.boatInformation.length = 0;
      doc.forEach(element => {
        this.boatInformation.push(element);
      });
    });
  }

  public addOrUpdateDoc(boat: BoatID): string {
    if (!boat.id) { boat.id = this.db.createId(); }
    this.itemsCollection.doc(boat.id).set({ name: boat.name, selectable: boat.selectable }, { merge: true });

    return boat.id;
  }

  public restore(boat: BoatID) {
    if (boat.name === '') {
      this.deleteDoc(boat);
    } else {
      this.itemsCollection.doc(boat.id).set({ name: boat.name, selectable: boat.selectable }, { merge: true });
    }
  }

  public deleteDoc(boat: BoatID) {
    this.itemsCollection.doc(boat.id).delete();
  }

  getBoatName(key: string): string {
    const boatFound =  this.boatInformation.find((boat) => {
      return boat.id === String(key);
    });
    if (boatFound) {
      return boatFound.name;
    } else {
      return "Unknown Name";
    }
  }

  keyFromName(name: string): string{
    const boatFound =  this.boatInformation.find((boat) => {
      return boat.name === name;
    });
    if (boatFound) {
      return boatFound.id;
    } else {
      return "Unknown Name";
    }
  }
}
