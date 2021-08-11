import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { CrudtableComponent } from './crudtable/crudtable.component';
import { EditDataComponent } from './edit-data/edit-data.component';

//const routes: Routes = [];
const routes:Routes= [
  { path: 'crudtable', component: CrudtableComponent },
  { path: 'edit-data/:id', component: EditDataComponent },
  {path:'add-data', component:AddDataComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
