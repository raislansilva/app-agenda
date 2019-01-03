import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../databse/database';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/*
  Generated class for the CategoriaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriaProvider {

  constructor(private dbProvider: DatabaseProvider) {}

  public insert(categoria:Categoria ) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into categorias (name) values (?)';
        let data = [categoria.name];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(categoria: Categoria, id) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update categorias set name = ? where id = ?';
        let data = [categoria.name, id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from categorias where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT *FROM categorias';
        var data: any[] = [];

        return db.executeSql(sql,data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let categorias: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var categoria = data.rows.item(i);
                categorias.push(categoria);
              }
              return categorias;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from categorias where id = ?';
        let data = [id];
  
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let categoria = new Categoria();
              categoria.id = item.id;
              categoria.name = item.titulo;
              return categoria;
            }
  
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  

}




export class Categoria {
  id: number;
  name:string;
}
