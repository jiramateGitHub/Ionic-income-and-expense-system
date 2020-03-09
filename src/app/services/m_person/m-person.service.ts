import { MPerson } from './../services.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class MPersonService   {
  
  private service: Observable<MPerson[]>;
  private serviceCollection: AngularFirestoreCollection<MPerson>;
 
  constructor(
    private afs: AngularFirestore) {
  }
 
// * @Function   : get_obs_mperson => คือค่าข้อมูล interface MPerson ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  get_obs_mperson(mperson:MPerson): Observable<MPerson[]> {
    this.serviceCollection = this.afs.collection<MPerson>('M_person', ref => ref.where('username', '==', mperson.username).where('password', '==', mperson.password));
    this.service = this.serviceCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.service;
  }

// * @Function   : get_obs_mperson_by_id => คือค่าข้อมูล interface MPerson โดยค้นหาจาก id
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  get_obs_mperson_by_id(id: string): Observable<MPerson> {
    return this.serviceCollection.doc<MPerson>(id).valueChanges().pipe(
      take(1),
      map(M_person => {
        M_person.id  = id;
        return M_person
      })
    );
  }

// * @Function   : insert_person => เพิ่มข้อมูล person ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  insert_person(mperson: MPerson): Promise<DocumentReference> {
    return this.serviceCollection.add(mperson);
  }

// * @Function   : update_person => แก้ไขข้อมูล person ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  update_person(mperson: MPerson): Promise<void> {
    return this.serviceCollection.doc(mperson.id).update({ username: mperson.username, password: mperson.password });
  }

// * @Function   : delete_person => ลบข้อมูล person ใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  delete_person(per_id: string): Promise<void> {
    return this.serviceCollection.doc(per_id).delete();
  }

}
