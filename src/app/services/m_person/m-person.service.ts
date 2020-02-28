import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MPersonService   {
  public per_id : string;
  public per_username : string;
  public per_password : string;
  public per_active : string;
  
  constructor(private http:Http) { }

  get_signin(){
    return this.http.get("http://127.0.0.1:3000/hr_person").map(res => res.json());
  }

}
