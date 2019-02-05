import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstStartComponent } from './first-start/first-start.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';





const routes: Routes = [
  {path: '', component: FirstStartComponent },
  {path: 'main', component: MainComponent },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
