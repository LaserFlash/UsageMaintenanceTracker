import { Injectable } from '@angular/core';
import { DocLink, DocLinkID } from './Utils/objects/docLink';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
/**
* Service that gets urls and titles for Healthy and Safety documnets from firebase
*/
export class SafetyDocsService {
  private itemsCollection: AngularFirestoreCollection<DocLink>;
  public safetyDocLinks: DocLinkID[] = [];  // Collection of links order alphabetically

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<DocLink>('/safetyDocs', ref => ref.orderBy('title', 'desc'));
    let items: Observable<DocLinkID[]>;
    items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as DocLinkID;
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
    });
  }

  public addOrUpdateDoc(doc: DocLinkID) {
    if (doc.id) {
      this.itemsCollection.doc(doc.id).set({ url: doc.url, title: doc.title }, { merge: true });
    } else {
      this.itemsCollection.add({ url: doc.url, title: doc.title });
    }
  }

  public deleteDoc(doc: DocLinkID) {
    this.itemsCollection.doc(doc.id).delete();
  }

  public restore(doc: DocLinkID) {
    this.itemsCollection.doc(doc.id).set({ url: doc.url, title: doc.title }, { merge: true });
  }
}
