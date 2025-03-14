import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-errord',
  standalone: true,
  imports: [],
  templateUrl: './server-errord.component.html',
  styleUrl: './server-errord.component.css'
})
export class ServerErrordComponent {
  error: any;

  //csak itt csinálunk constructort, mert csak itt tudjuk elérni 
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

}
