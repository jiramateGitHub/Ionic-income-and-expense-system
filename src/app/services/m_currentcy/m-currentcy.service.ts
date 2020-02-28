import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MCurrentcyService {
  public cur_id : string;
  public cur_name : string;
  public cur_active : string;
  constructor(private http:Http) { }
}
