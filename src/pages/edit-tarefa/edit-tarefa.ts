import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TarefaProvider, Tarefa } from '../../providers/tarefa/tarefa';
import { CategoriaProvider } from '../../providers/categoria/categoria';

/**
 * Generated class for the EditTarefaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-tarefa',
  templateUrl: 'edit-tarefa.html',
})
export class EditTarefaPage {
  model: Tarefa;
  categorias: any[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastController,
    private tarefaProvider: TarefaProvider,
    private categoriaProvider: CategoriaProvider

  ) {

    this.model = new Tarefa();

    if (this.navParams.data.id) {
      this.tarefaProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

  }

  ionViewDidLoad() {
    this.categoriaProvider.getAll()
      .then((result: any[]) => {
        this.categorias = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });
  }

  save() {
    this.saveTarefa() 
      .then(() => {
        this.toast.create({ message: 'Tarefa salva.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a tarefa.', duration: 3000, position: 'botton' }).present();
      });
  }

  saveTarefa() {
    if (this.model.id) {
      return this.tarefaProvider.update(this.model);
    } else {
      return this.tarefaProvider.insert(this.model);
    }
  }

  

}
