import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTarefaPage } from './edit-tarefa';

@NgModule({
  declarations: [
    EditTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTarefaPage),
  ],
})
export class EditTarefaPageModule {}
