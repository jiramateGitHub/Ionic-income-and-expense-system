import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MCategoriesService {
  public cat_id	: string;
  public cat_name : string;
  public cat_type	 : string;
  public cat_active : string;
  public cat_editor : string;

  constructor(private http:Http) { }
}
