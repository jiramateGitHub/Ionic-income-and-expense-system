import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MTransectionService {
  public tran_id : string;
  public tran_catt_id	: string;
  public tran_wat_id : string;
  public tran_amount : string;
  public tran_note : string;
  public tran_date : string;
  public tran_time : string;
  public tran_active : string;
  public tran_editor: string;
  
  constructor(private http:Http) { }
}
