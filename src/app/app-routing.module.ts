import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detect-gender',
    loadChildren: () => import('./detect-gender/detect-gender.module').then( m => m.DetectGenderPageModule)
  },
  {
    path: 'detect-age',
    loadChildren: () => import('./detect-age/detect-age.module').then( m => m.DetectAgePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'register-send-email',
    loadChildren: () => import('./register-send-email/register-send-email.module').then( m => m.RegisterSendEmailPageModule)
  },
  {
    path: 'register-by-email',
    loadChildren: () => import('./register-by-email/register-by-email.module').then( m => m.RegisterByEmailPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'chat-hellp',
    loadChildren: () => import('./chat-hellp/chat-hellp.module').then( m => m.ChatHellpPageModule)
  },
  {
    path: 'boost-page',
    loadChildren: () => import('./boost-page/boost-page.module').then( m => m.BoostPagePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
