import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'tooltipfeature',
    component: AppComponent,
  },
  
  { 
    path: '**', 
    redirectTo: 'tooltipfeature' 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
