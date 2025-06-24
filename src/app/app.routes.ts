import { Routes } from '@angular/router';
import { Logo } from './Pages/logo/logo';
import { Home } from './Pages/home/home';

export const routes: Routes = [
    {path: '', component: Logo},
    {path: 'home', component: Home}
];
