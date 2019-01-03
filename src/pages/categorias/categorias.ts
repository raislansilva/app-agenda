import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CategoriaProvider, Categoria } from '../../providers/categoria/categoria';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  model:Categoria
  categorias:any[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoriaProvider: CategoriaProvider,
    public alertctrl:AlertController,
    private toast: ToastController,
  ) {

    

  }

  ionViewDidEnter() {
    this.categoriaProvider.getAll()
    .then((result:any[]) =>{
       this.categorias = result
    })
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


  updateTask(id, categoria){
  
    let alert = this.alertctrl.create({
      title: 'Atualizar Categoria',
      message: 'Atualize essa categoria',
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
          text: 'Atualizar',
          handler: (data)=>{ 
            this.categoriaProvider.update(data,id)
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

  deleteTask(categoria){
    this.categoriaProvider.remove(categoria.id)
    .then(() => {
      // Removendo do array de tarefa
      var index = this.categorias.indexOf(categoria);
      this.categorias.splice(index, 1);
      this.toast.create({ message: 'Categpria removida.', duration: 3000, position: 'botton' }).present();
    })
  }


}
