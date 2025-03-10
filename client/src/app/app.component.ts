import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  http = inject(HttpClient); //automatikus import felül
  title = 'DatingApp';
  users: any; //any type - propertyket normál jskódként akarjuk használni

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({ //szabály:ha subscribeolsz, unsubscribeolj is, DE get-nél nem kell mert mindig completel
      next: response => this.users=response, //response az az amit visszaad a get kérés - beletöltöm a users-be
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    }) 
    //ez a get önmagában egy observable-t készít, ami gyakorlatilag egy datastream, de fel kell rá iratkozni, különben nem csinál semmit mert lusta
  }
}
