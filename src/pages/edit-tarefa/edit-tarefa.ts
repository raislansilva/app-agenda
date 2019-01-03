import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TarefaProvider, Tarefa } from '../../providers/tarefa/tarefa';
import { CategoriaProvider, Categoria } from '../../providers/categoria/categoria';
import { DatePicker } from '../../../node_modules/@ionic-native/date-picker';

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
    public alertctrl:AlertController,
    private datePicker: DatePicker

  ) {

    this.model = new Tarefa();

    if (this.navParams.data.id) {
      this.tarefaProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

  }

  dateTime(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
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
