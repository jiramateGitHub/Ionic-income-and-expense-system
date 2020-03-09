import { MSubCategories } from './../services.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MSubCategoriesService {

  private service: Observable<MSubCategories[]>;

  private serviceCollection: AngularFirestoreCollection<MSubCategories>;
 
  constructor(
    private afs: AngularFirestore) {
  }

  // * @Function   : insert_sub_categories => เพิ่มข้อมูล sub_categories ลงใน Firebase Cloud
// * @Author     : Thananya Banchuenwijit
// * @Create Date: 2563-03-09
insert_sub_categories(msubcategories: MSubCategories): Promise<DocumentReference> {
  return this.serviceCollection.add(msubcategories);
}

// * @Function   : update_sub_categories => แก้ไขข้อมูล sub_categories ลงใน Firebase Cloud
// * @Author     : Thananya Banchuenwijit
// * @Create Date: 2563-03-09
update_sub_categories(msubcategories: MSubCategories): Promise<void> {
  return this.serviceCollection.doc(msubcategories.id).update({ categorise_name: msubcategories.categorise_name, categorise_type: msubcategories.categorise_type, sub_categories_name: msubcategories.sub_categories_name });
}

// * @Function   : delete_sub_categories => ลบข้อมูล sub_categories ใน Firebase Cloud
// * @Author     : Thananya Banchuenwijit
// * @Create Date: 2563-03-09
delete_sub_categories(id: string): Promise<void> {
  return this.serviceCollection.doc(id).delete();
}
}
