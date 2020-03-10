import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { MTransaction } from './../services.service';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MTransactionService {

  private service: Observable<MTransaction[]>;
  private serviceCollection: AngularFirestoreCollection<MTransaction>;

  constructor(
    private afs: AngularFirestore) {
    this.serviceCollection = this.afs.collection<MTransaction>('M_transaction')
  }

  // * @Function   : get_obs_mtransaction => คือค่าข้อมูล interface MTransaction ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
  // * @Author     : Sathien Supabkul
  // * @Create Date: 2563-03-09
  get_obs_mtransaction(mtransaction: MTransaction): Observable<MTransaction[]> {
    // this.serviceCollection = this.afs.collection<MTransaction>('M_transaction', ref => ref.where('transaction_date', '==', mtransaction.transaction_date));
    this.serviceCollection = this.afs.collection<MTransaction>('M_transaction');
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

  // * @Function   : insert_transection => เพิ่ม Transacrion
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-10
  async insert_transection(mtransaction:MTransaction) {
    this.serviceCollection.add(mtransaction);
  }

  // * @Function   : get_all_transaction_show => แสดงข้อมูล Transaction ทั้งหมด
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-10
  get_all_transaction_show():Observable<MTransaction[]>{
    this.serviceCollection = this.afs.collection<MTransaction>('M_transaction');
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

  // * @Function   : get_edit_transaction => ดึงข้อมูลเพื่อแก้ไข Transacrion
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-10
  get_edit_transaction(id:string):Observable<MTransaction>{
    return this.serviceCollection.doc<MTransaction>(id).valueChanges().pipe(
      take(1),
      map(MTransaction => {
        MTransaction.id = id;
        return MTransaction
      })
    );
  }

  // * @Function   : edit_transection => แก้ไข Transacrion
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-10
  async edit_transection(id:string , mtransaction:MTransaction) {
    this.serviceCollection.doc<MTransaction>(id).update(mtransaction);
  }
  // * @Function   : delete_transaction => ลบข้อมูล Transaction 
  // * @Author     : Thanpisit Suetrong
  // * @Create Date: 2563-03-11
   delete_transaction(id:string){
    this.serviceCollection.doc<MTransaction>(id).delete();
  }

}
