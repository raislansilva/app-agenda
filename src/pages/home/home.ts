import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TarefaProvider, Tarefa } from '../../providers/tarefa/tarefa';
import { EditTarefaPage } from '../edit-tarefa/edit-tarefa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tarefas: any[] = [];

  constructor(public navCtrl: NavController,  private toast: ToastController, private tarefaProvider: TarefaProvider) {

  }

  ionViewDidEnter() {
    this.getAllTarefas();
  }

  getAllTarefas() {
    this.tarefaProvider.getAll()
      .then((result: any[]) => {
        this.tarefas = result;
        console.log(this.tarefas)
      });
  }

  addTarefa() {
    this.navCtrl.push(EditTarefaPage);
  }

  editTarefa(id: number) {
    this.navCtrl.push(EditTarefaPage, { id: id });
  }

  removeTarefa(tarefa: Tarefa) {
    this.tarefaProvider.remove(tarefa.id)
      .then(() => {
        // Removendo do array de tarefa
        var index = this.tarefas.indexOf(tarefa);
        this.tarefas.splice(index, 1);
        this.toast.create({ message: 'Tarefa removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  

}

