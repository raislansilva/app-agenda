import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../databse/database';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/*
  Generated class for the TarefaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TarefaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(tarefa: Tarefa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into tarefas (titulo, descricao, data, categoria_id) values (?, ?, ?, ?)';
        let data = [tarefa.titulo, tarefa.descricao,tarefa.data,tarefa.categoria_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(tarefa: Tarefa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update tarefas set titulo = ?, descricao = ?, data = ?, categoria_id = ? where id = ?';
        let data = [tarefa.titulo, tarefa.descricao, tarefa.data, tarefa.categoria_id,tarefa.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from tarefas where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from tarefas where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let tarefa = new Tarefa();
              tarefa.id = item.id;
              tarefa.titulo = item.titulo;
              tarefa.descricao = item.descricao;
              tarefa.data = item.data;
              tarefa.categoria_id = item.categoria_id;

              return tarefa;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM tarefas';
        var data: any[] = [];

        return db.executeSql(sql,data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let tarefas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var tarefa = data.rows.item(i);
                tarefas.push(tarefa);
              }
              return tarefas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  data: Date;
  categoria_id: number;
}
