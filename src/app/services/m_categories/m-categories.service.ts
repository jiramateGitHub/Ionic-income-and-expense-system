import { ServicesService, MCategories } from './../services.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MCategoriesService {

  private service: Observable<MCategories[]>;
  private serviceCollection: AngularFirestoreCollection<MCategories>;

  orderList:string; 
 
  constructor(
    private afs: AngularFirestore,
    private servicesService : ServicesService) {
    this.serviceCollection = this.afs.collection<MCategories>('M_categories', ref => ref.where('cat_type', '==', 1));
    this.service = this.serviceCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => { 
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    
  }
 
// * @Function   : get_obs_mcategories_income => คือค่าข้อมูล interface MCategories ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  get_obs_mcategories_income(): Observable<MCategories[]> {
    return this.service;
  }

// * @Function   : get_obs_mcategories_expense => คือค่าข้อมูล interface MCategories ที่เราเอามาทำให้อยู่ในรูปที่สามารถ Observe ได้
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  get_obs_mcategories_expense(): Observable<MCategories[]> {
    return this.service;
  }

// * @Function   : get_obs_mcategories_by_id => คือค่าข้อมูล interface MCategories โดยค้นหาจาก id
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  get_obs_mcategories_by_id(id: string): Observable<MCategories> {
    return this.serviceCollection.doc<MCategories>(id).valueChanges().pipe(
      take(1),
      map(MCategories => {
        MCategories.id = id;
        return MCategories
      })
    );
  }

// * @Function   : insert_categories => เพิ่มข้อมูล categories ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  insert_categories(mcategories: MCategories): Promise<DocumentReference> {
    return this.serviceCollection.add(mcategories);
  }

// * @Function   : update_categories => แก้ไขข้อมูล categories ลงใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  update_categories(mcategories: MCategories): Promise<void> {
    return this.serviceCollection.doc(mcategories.id).update({ categories_name: mcategories.categories_name, categories_type: mcategories.categories_type });
  }

// * @Function   : delete_categories => ลบข้อมูล categories ใน Firebase Cloud
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-03
  delete_categories(cat_id: string): Promise<void> {
    return this.serviceCollection.doc(cat_id).delete();
  }

}
