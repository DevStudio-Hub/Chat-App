import { Routes } from '@angular/router';
import { Logo } from './Pages/logo/logo';
import { Home } from './Pages/home/home';
import { Dashboard } from './Pages/dashboard/dashboard';
import { SearchPage } from './Pages/search-page/search-page';
import { UserProfile } from './Pages/user-profile/user-profile';

export const routes: Routes = [
    {path: '', component: Logo},
    {path: 'dashboard', component: Dashboard, children: [
        {path: 'home', component: Home},
        {path: 'search', component: SearchPage},
        {path: 'userProfile/:userId', component: UserProfile, }
    ]},
    
];
