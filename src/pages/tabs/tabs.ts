import { Component } from '@angular/core';
import { FavoritosPage } from '../favoritos/favoritos';
import { CategoriasPage } from '../categorias/categorias';
import { HomePage } from '../home/home';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = HomePage;  
  tab3Root = CategoriasPage;
  
  constructor() {

  }
}
