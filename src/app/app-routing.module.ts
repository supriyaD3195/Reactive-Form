import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',
component:FormComponent},
{ path: 'view.component', component: ViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
