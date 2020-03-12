import { MWallet } from './../services.service';
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
    private afs: AngularFirestore) {
    this.serviceCollection = this.afs.collection<MWallet>('M_wallet')
    
  }

  get_obs_mwallet(): Observable<MWallet[]> {
    this.serviceCollection = this.afs.collection<MWallet>('M_wallet');
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

  insert_wallet(mwallet:MWallet){
    this.serviceCollection.add(mwallet);
  }


  delete_transaction(id:string){
    this.serviceCollection.doc<MWallet>(id).delete();
  }
}
