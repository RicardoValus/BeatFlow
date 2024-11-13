import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'edit-music',
    loadComponent: () => import('./pages/edit-music/edit-music.page').then( m => m.EditMusicPage)
  },
  {
    path: 'edit-music/:id',
    loadComponent: () => import('./pages/edit-music/edit-music.page').then(m => m.EditMusicPage)  //Comentário: adicionando rota para passar id como parametro e navegar para o determinado item
  },
  
];
