import { Routes } from '@angular/router';
import { Logo } from './Pages/logo/logo';
import { Home } from './Pages/home/home';
<<<<<<< Updated upstream

export const routes: Routes = [
    {path: '', component: Logo},
    {path: 'home', component: Home}
=======
import { Dashboard } from './Pages/dashboard/dashboard';
import { SearchPage } from './Pages/search-page/search-page';
import { UserProfile } from './Pages/user-profile/user-profile';
import { Register } from './Pages/register/register';
export const routes: Routes = [
    {path: '', component: Logo},
    {path: 'register', component: Register},
    {path: 'dashboard', component: Dashboard, children: [
        {path: 'home', component: Home},
        {path: 'search', component: SearchPage},
        {path: 'userProfile/:userId', component: UserProfile, },
        
    ]},
    
>>>>>>> Stashed changes
];
