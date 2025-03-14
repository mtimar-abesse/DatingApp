import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//ha már egy függvény is false-al tér vissza, nem lehet navigálni - NEM security, kliens oldalon nem lehet securityt csinálni
export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if(accountService.currentUser()){
    return true;
  }else{
    toastr.error('You shall not pass!');
    return false;
  }
};
