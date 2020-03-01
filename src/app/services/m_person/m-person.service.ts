import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
export interface MPerson {
  per_id?: string,
  per_username: string,
  per_password: string,
  per_active: string
}

@Injectable({
  providedIn: 'root'
})
export class MPersonService   {
  
  private obs_mperson: Observable<MPerson[]>;
  private mpersonCollection: AngularFirestoreCollection<MPerson>;
 
  constructor(private afs: AngularFirestore) {
    this.mpersonCollection = this.afs.collection<MPerson>('M_person');
    this.obs_mperson = this.mpersonCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  get_obs_mperson(): Observable<MPerson[]> {
    return this.obs_mperson;
  }
 
  get_obs_mperson_by_id(id: string): Observable<MPerson> {
    return this.mpersonCollection.doc<MPerson>(id).valueChanges().pipe(
      take(1),
      map(M_person => {
        M_person.per_id = id;
        return M_person
      })
    );
  }
 
  insert_person(mperson: MPerson): Promise<DocumentReference> {
    return this.mpersonCollection.add(mperson);
  }
 
  update_person(mperson: MPerson): Promise<void> {
    return this.mpersonCollection.doc(mperson.per_id).update({ per_username: mperson.per_username, per_password: mperson.per_password });
  }
 
  delete_person(per_id: string): Promise<void> {
    return this.mpersonCollection.doc(per_id).delete();
  }

}
