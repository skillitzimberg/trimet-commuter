import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstStartComponent } from './first-start/first-start.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component'


const routes: Routes = [
  {path: '', component: FirstStartComponent },
  {path: 'main', component: MainComponent },
  {path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
