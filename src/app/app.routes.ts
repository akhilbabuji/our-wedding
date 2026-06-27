import { Routes } from '@angular/router';
import { InviteComponent } from './pages/invite/invite.component';

export const routes: Routes = [
  { path: '', redirectTo: 'invite', pathMatch: 'full' },
  { path: 'invite', component: InviteComponent },
  { path: 'invite/:guest', component: InviteComponent },
  { path: '**', redirectTo: 'invite' },
];
