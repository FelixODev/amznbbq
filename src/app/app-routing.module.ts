import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserResolverService } from './resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    resolve: {
      user: UserResolverService
    }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'dates',
    loadChildren: () => import('./pages/dates/dates.module').then( m => m.DatesPageModule),
    resolve: {
      user: UserResolverService
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    resolve: {
      user: UserResolverService
    }
  },
  {
    path: 'prospect/:date_id',
    loadChildren: () => import('./pages/prospect/prospect.module').then( m => m.ProspectPageModule),
    resolve: {
      user: UserResolverService
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
