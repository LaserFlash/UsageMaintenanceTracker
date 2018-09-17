import { Injectable } from '@angular/core';
import { DocLink } from './Utils/objects/docLink';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
/**
* Service that gets urls and titles for Healthy and Safety documnets from firebase
*/
export class SafetyDocsService {
  private itemsCollection: AngularFirestoreCollection<DocLink>;
  public safetyDocLinks: DocLink[] = [];  // Collection of links order alphabetically

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<DocLink>('/safetyDocs', ref => ref.orderBy('title', 'desc'));
    let items: Observable<DocLink[]>;
    items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as DocLink;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );

    items.subscribe((doc) => {
      this.safetyDocLinks.length = 0;
      doc.forEach(element => {
        this.safetyDocLinks.push(element);
      });
    };
  }

  public addOrUpdateDoc(doc: DocLink) {
    if (doc.id) {
      this.itemsCollection.doc(doc.id).set({ url: doc.url, title: doc.title }, { merge: true });
    } else {
      this.itemsCollection.add({ url: doc.url, title: doc.title });
    }
  }

  public deleteDoc(doc: DocLink) {
    this.itemsCollection.doc(doc.id).delete();
  }
}
