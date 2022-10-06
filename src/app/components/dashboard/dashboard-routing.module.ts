import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AltaComponent } from './alta/alta.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  { path: '',component: DashboardComponent,children: [
    { path: '', pathMatch: 'full',component: MainPageComponent },
    { path: 'alta', pathMatch: 'full',component: AltaComponent },
    { path: 'detalle', pathMatch: 'full',component: DetalleComponent },
    { path: 'producto', pathMatch: 'full',component: ProductoComponent },
  ] },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}