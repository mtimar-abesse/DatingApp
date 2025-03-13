import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

//miben más egy service mint egy component?
//injectable, tehát bele lehet injectelni ahova akarjuk
//singleton, akkor jön létre amikor ráfrissítünk az oldalra/megnyitjuk, magától felszabadul app végével együtt
//itt szokás http kéréseket csinálni

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    ) //a pipe-hoz kellenek rxjs operátorok amik olyanok mint JS függvények, de observable-khez használjuk, ilyen a map
  } //hozzáadjuk a localstorage-hoz, hogy ne jelentkeződjünk ki ha ráfrissítünk

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )    
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  
}
