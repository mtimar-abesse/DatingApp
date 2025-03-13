import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users: any; //any type - propertyket normál jskódként akarjuk használni

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({ //szabály:ha subscribeolsz, unsubscribeolj is, DE get-nél nem kell mert mindig completel
      next: response => this.users=response, //response az az amit visszaad a get kérés - beletöltöm a users-be
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    }) 
    //ez a get önmagában egy observable-t készít, ami gyakorlatilag egy datastream, de fel kell rá iratkozni, különben nem csinál semmit mert lusta
  }
}
