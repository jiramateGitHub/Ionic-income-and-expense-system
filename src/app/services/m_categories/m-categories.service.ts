import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

// * @Interface  : MCategories => เก็บข้อมูล Object ของ MCategoriesService
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
export interface MCategories {
  cat_id?: string,
  cat_name: string,
  cat_type: number,
  cat_active: string
}
@Injectable({
  providedIn: 'root'
})
export class MCategoriesService {
  public cat_id	: string;
  public cat_name : string;
  public cat_type	 : string;
  public cat_active : string;

  private obs_mcategories: Observable<MCategories[]>;
  private mcategoriesCollection: AngularFirestoreCollection<MCategories>;
 
  constructor(private afs: AngularFirestore) {
    this.mcategoriesCollection = this.afs.collection<MCategories>('M_categories', ref => ref.where('cat_type', '==', 1));
    this.obs_mcategories = this.mcategoriesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => { 
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.obs_mcategories.subscribe(res => console.log(res))
      
  }
  
 
// * @Function   : get_obs_mcategories => คือค่าข้อมูล interface MCategories ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  get_obs_mcategories(): Observable<MCategories[]> {
    return this.obs_mcategories;
  }

// * @Function   : get_obs_mcategories_by_id => คือค่าข้อมูล interface MCategories โดยค้นหาจาก id
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  get_obs_mcategories_by_id(id: string): Observable<MCategories> {
    return this.mcategoriesCollection.doc<MCategories>(id).valueChanges().pipe(
      take(1),
      map(MCategories => {
        MCategories.cat_id = id;
        return MCategories
      })
    );
  }

// * @Function   : insert_categories => เพิ่มข้อมูล categories ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  insert_categories(mcategories: MCategories): Promise<DocumentReference> {
    return this.mcategoriesCollection.add(mcategories);
  }

// * @Function   : update_categories => แก้ไขข้อมูล categories ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  update_categories(mcategories: MCategories): Promise<void> {
    return this.mcategoriesCollection.doc(mcategories.cat_id).update({ cat_name: mcategories.cat_name, cat_type: mcategories.cat_type });
  }

// * @Function   : delete_categories => ลบข้อมูล categories ใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  delete_categories(cat_id: string): Promise<void> {
    return this.mcategoriesCollection.doc(cat_id).delete();
  }

}
