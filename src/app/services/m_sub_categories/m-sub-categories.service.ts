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

  private service: Observable<MSubCategories[]>
  private serviceCollection: AngularFirestoreCollection<MSubCategories>;

  constructor(
    private afs: AngularFirestore) {
    this.serviceCollection = this.afs.collection<MSubCategories>('M_sub_categories')

  }

  get_obs_msubcategories_by_id(id: string): Observable<MSubCategories> {
    return this.serviceCollection.doc<MSubCategories>(id).valueChanges().pipe(
      take(1),
      map(M_sub_categories => {
        M_sub_categories.id = id;
        return M_sub_categories
      })
    );
  }

  // * @Function   : insert_sub_categories => เพิ่มข้อมูล sub_categories ลงใน Firebase Cloud
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  insert_sub_categories(msubcategories: MSubCategories): Promise<DocumentReference> {
    console.log(msubcategories)
    return this.serviceCollection.add(msubcategories);
  }

  // * @Function   : update_sub_categories => แก้ไขข้อมูล sub_categories ลงใน Firebase Cloud
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  update_sub_categories(msubcategories: MSubCategories): Promise<void> {
    return this.serviceCollection.doc(msubcategories.id).update({ categories_name: msubcategories.categories_name, categories_type: msubcategories.categories_type, sub_categories_name: msubcategories.sub_categories_name });
  }

  // * @Function   : delete_sub_categories => ลบข้อมูล sub_categories ใน Firebase Cloud
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  delete_sub_categories(id: string): Promise<void> {
    return this.serviceCollection.doc(id).delete();
  }
}
