import { SessionService } from './../session/session.service';
import { MWallet, ServicesService } from './../services.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class MWalletService {

  public service: Observable<MWallet[]>
  private serviceCollection: AngularFirestoreCollection<MWallet>; 

  constructor(
    private afs: AngularFirestore,
    private SessionService:SessionService) {
    this.serviceCollection = this.afs.collection<MWallet>('M_wallet')
    
  }

  get_obs_mwallet(): Observable<MWallet[]> {
    this.serviceCollection = this.afs.collection<MWallet>('M_wallet', ref => ref.where('username', '==', this.SessionService.get_session_username() ));
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

  // * @Function   :  insert_wallet => เพิ่ม wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-13
  insert_wallet(mwallet:MWallet){
    this.serviceCollection.add(mwallet);
  }

  // * @Function   :  delete_wallet=> ลบ wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-13
  delete_wallet(id:string){
    this.serviceCollection.doc<MWallet>(id).delete();
  }

  // * @Function   :  get_edit_wallet=> get ข้อมูลเก่า wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-13
  get_edit_wallet(id:string):Observable<MWallet>{
    return this.serviceCollection.doc<MWallet>(id).valueChanges().pipe(
      take(1),
      map(MTransaction => {
        // MTransaction.id = id;
        return MTransaction
      })
    );
  }
  
  // * @Function   : update_wallet_name=> แก้ไขชื่อ wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-13
  async update_wallet_name(id:string , mwallet:MWallet) {
    this.serviceCollection.doc<MWallet>(id).update(mwallet);
  }

}
