import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage {

  // declare vairables for use
  name: string = '';
  phone: string ='';
  constructor(
    private modalCtrl: ModalController) { 

    }

  cancel(){

    // remove from stack
    return this.modalCtrl.dismiss(null,'cancel')
  }

  confirm(){
    // package the data 
    let newContact = {'name':this.name,'phone':this.phone};

    // remove modal from stack/view
    return this.modalCtrl.dismiss(newContact,'confirm');

  }

  ngOnInit() {
  }

}
