import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MWalletService {
  public wat_id : string;
  public wat_cat_id : string;
  public wat_per_id	: string;
  public wat_cur_id	: string;
  public wat_balance : string;
  public wat_active	: string;
  public wat_editor : string;

  constructor(private http:Http) { }
}
