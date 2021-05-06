import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { UserService } from '../services/fire.service';
@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve <Observable<any>> {

  constructor(
  private user$: UserService,
  ) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.user$.state$.pipe(
      take(1),
      map(async user => {
        if(user){
          return await this.user$.get()||{
            uid: user?.uid
          };
        } else {
          const u:any = await this.user$.anonymous();
          return {uid: u?.user?.uid}
        }
      })
    )

    // .subscribe(async u => {
    //   if(u) {
    //     let usr = await this.user$.get()||{
    //       uid: u.uid
    //     };
    //     this.user = usr;
    //     this.updated = {...usr};
    //   } else {
    //     this.auth.anonymous('local');
    //   }
    // });

  }
}
