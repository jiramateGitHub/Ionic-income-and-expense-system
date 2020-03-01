import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
export interface Person {
  id?: string,
  per_username: string,
  per_password: string
}

@Injectable({
  providedIn: 'root'
})
export class MPersonService   {
  // public per_id : string;
  // public per_username : string;
  // public per_password : string;
  // public per_active : string;
  
  private ideas: Observable<Person[]>;
  private ideaCollection: AngularFirestoreCollection<Person>;
 
  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Person>('M_person');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getIdeas(): Observable<Person[]> {
    return this.ideas;
  }
 
  getIdea(id: string): Observable<Person> {
    return this.ideaCollection.doc<Person>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }
 
  addIdea(idea: Person): Promise<DocumentReference> {
    return this.ideaCollection.add(idea);
  }
 
  updateIdea(idea: Person): Promise<void> {
    return this.ideaCollection.doc(idea.id).update({ per_username: idea.per_username, per_password: idea.per_password });
  }
 
  deleteIdea(id: string): Promise<void> {
    return this.ideaCollection.doc(id).delete();
  }

}
