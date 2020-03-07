import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

// * @Interface  : MPerson => เก็บข้อมูล Object ของ MPerson
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
export interface MPerson {
  per_id: string,
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
  }
 
// * @Function   : get_obs_mperson => คือค่าข้อมูล interface MPerson ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  get_obs_mperson(username, password): Observable<MPerson[]> {
    this.mpersonCollection = this.afs.collection<MPerson>('M_person', ref => ref.where('per_username', '==', username).where('per_password', '==', password));
    this.obs_mperson = this.mpersonCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.obs_mperson;
  }

// * @Function   : get_obs_mperson_by_id => คือค่าข้อมูล interface MPerson โดยค้นหาจาก id
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  get_obs_mperson_by_id(id: string): Observable<MPerson> {
    return this.mpersonCollection.doc<MPerson>(id).valueChanges().pipe(
      take(1),
      map(M_person => {
        M_person.per_id = id;
        return M_person
      })
    );
  }

// * @Function   : insert_person => เพิ่มข้อมูล person ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  insert_person(mperson: MPerson): Promise<DocumentReference> {
    return this.mpersonCollection.add(mperson);
  }

// * @Function   : update_person => แก้ไขข้อมูล person ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  update_person(mperson: MPerson): Promise<void> {
    return this.mpersonCollection.doc(mperson.per_id).update({ per_username: mperson.per_username, per_password: mperson.per_password });
  }

// * @Function   : delete_person => ลบข้อมูล person ใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  delete_person(per_id: string): Promise<void> {
    return this.mpersonCollection.doc(per_id).delete();
  }

}
