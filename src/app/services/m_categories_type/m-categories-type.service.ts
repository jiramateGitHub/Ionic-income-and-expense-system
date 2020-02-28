import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MCategoriesTypeService {
  public catt_id : string;
  public catt_cat_id : string;
  public catt_name : string;
  public catt_active : string;
  public catt_editor : string;

  constructor(private http:Http) { }
}
