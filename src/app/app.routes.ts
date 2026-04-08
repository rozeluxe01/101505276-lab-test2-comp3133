import { Routes } from '@angular/router';
import { CharacterlistComponent } from './components/characterlist/characterlist';
import { CharacterdetailsComponent } from './components/characterdetails/characterdetails';
import { CharacterfilterComponent } from './components/characterfilter/characterfilter';


export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'filter', component: CharacterfilterComponent },
  { path: 'details', component: CharacterdetailsComponent }
];