import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TarefaProvider, Tarefa } from '../../providers/tarefa/tarefa';
import { CategoriaProvider, Categoria } from '../../providers/categoria/categoria';

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
  categorias:any[] = []


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastController,
    private tarefaProvider: TarefaProvider,
    private categoriaProvider: CategoriaProvider,
    public alertctrl:AlertController


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


  openAlertNewCategoria(){
    let alert = this.alertctrl.create({
      title: 'Criar Categoria',
      message: 'Crie uma nova categoria',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nova Categoria',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Criar',
          handler: (data)=>{ 
            this.categoriaProvider.insert(data)
            .then(response => {
               this.toast.create({ message: 'Categoria salva.', duration: 3000, position: 'botton' }).present();

            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }


  updateTask(categoria, index){
    categoria = Object.assign({}, categoria);
    this.categoriaProvider.update(categoria)
    .then( response => {
      this.categorias[index] = categoria;
    })
    .catch( error => {
      console.error( error );
    })
  }

  deleteTask(categoria: any, index){
    this.categoriaProvider.remove(categoria)
    .then(response => {
      console.log( response );
      this.categorias.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

  

}
