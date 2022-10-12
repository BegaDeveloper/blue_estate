import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { EstateViewComponent } from './components/sidebar/estate-view/estate-view.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/sidebar/nav/nav.component';
import { ListComponent } from './components/sidebar/list/list.component';
import { AboutComponent } from './components/about/about.component';
import { HowToComponent } from './components/how-to/how-to.component';

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    children: [
      { path: '', redirectTo: '/main/list', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'map', component: MapComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'estate-view', component: EstateViewComponent },
      { path: 'nav', component: NavComponent },
      { path: 'list', component: ListComponent },
      { path: 'about', component: AboutComponent },
      { path: 'how-to', component: HowToComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
export const routingLinks = [
  HomeComponent,
  MapComponent,
  EstateViewComponent,
  SidebarComponent,
  DashComponent,
  NavComponent,
  ListComponent,
  AboutComponent,
  HowToComponent,
];
