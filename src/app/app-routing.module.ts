import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetStopsComponent } from './set-stops/set-stops.component';
import { MainComponent } from './main/main.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
  {path: '', component:  StartupComponent},
  {path: 'stops', component: SetStopsComponent },
  {path: 'main', component: MainComponent },
  {path: 'main/:mode', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
