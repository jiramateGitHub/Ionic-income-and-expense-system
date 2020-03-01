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

  idea: Person = {
    name: '',
    notes: ''
  };

  private type_input: string;
  private ideas: Observable<Person[]>;
 
  constructor(private activatedRoute: ActivatedRoute, private MPersonService: MPersonService,
    private toastController: ToastController, private router: Router,private modalController: ModalController,
    navParams: NavParams) { 
      this.type_input = navParams.get('type_input')
    }
 
  ngOnInit() {
    this.ideas = this.MPersonService.getIdeas();
    console.log(this.ideas.subscribe(res => console.log(res)))
   }
 
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.MPersonService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }
 
  addIdea() {
    this.MPersonService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }
 
  deleteIdea() {
    this.MPersonService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Idea deleted');
    }, err => {
      this.showToast('There was a problem deleting your idea :(');
    });
  }
 
  updateIdea() {
    this.MPersonService.updateIdea(this.idea).then(() => {
      this.showToast('Idea updated');
    }, err => {
      this.showToast('There was a problem updating your idea :(');
    });
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
