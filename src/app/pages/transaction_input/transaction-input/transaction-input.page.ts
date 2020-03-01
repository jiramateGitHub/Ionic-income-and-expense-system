import { MPersonService } from './../../../services/m_person/m-person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './transaction-input.page.html',
  styleUrls: ['./transaction-input.page.scss'],
})
export class TransactionInputPage implements OnInit {

  private type_input: string;
 
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController, 
    private modalController: ModalController,
    private navParams: NavParams,
    private MPersonService: MPersonService
  ) { 
      this.type_input = navParams.get('type_input');
    }
 
  ngOnInit() {
   }
 
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
