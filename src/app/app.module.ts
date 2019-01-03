import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/databse/database';
import { TarefaProvider } from '../providers/tarefa/tarefa';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { EditTarefaPage } from '../pages/edit-tarefa/edit-tarefa';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { SQLite } from '../../node_modules/@ionic-native/sqlite';
import { DatePicker } from '@ionic-native/date-picker';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CategoriasPage } from '../pages/categorias/categorias';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditTarefaPage, 
    TabsPage,
    FavoritosPage,
    CategoriasPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditTarefaPage,
    TabsPage,
    FavoritosPage,
    CategoriasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatePicker,
    DatabaseProvider,
    TarefaProvider,
    CategoriaProvider
  ]
})
export class AppModule {}
