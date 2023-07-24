import { Component} from '@angular/core';
import { ContactsDbService } from '../contacts-db.service';
import { ModalController,ActionSheetController } from '@ionic/angular';
import { AddContactPage } from '../add-contact/add-contact.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //declare arrays 

  contacts:{ name: string; id: string; phone:string }[]=[];

  results : { id: number; name: string; phone:string }[] =[];

  
  constructor(
    // db connection service
    public contactsDb : ContactsDbService,
    // ui features
    private modalCtrl : ModalController,
    private actionSheetCtrl:ActionSheetController
  
  ) { 


  }

  ngOnInit(){

    // Load the contacts list as the view initializes
    this.contactsDb.getContacts().subscribe(res=>{
      this.contacts = res;
    },err=>{
      alert(err.message)
    });
 
  }

  


  findContact(event:any){
    const query:string = event.target.value.toLowerCase();

    // check that event is getting data in console
    console.log(query);

    // this.contacts.filter((name) => name.toLowerCase().indexOf(query) > -1);
    
    // const hasAttr = this.contacts.filter(person=> person.name.includes(query));

    // console.log(hasAttr);

  }

  async addContact() {
    // open modal
    const modal = await this.modalCtrl.create({
      component: AddContactPage,
    });
    modal.present();

    // the data will be returned here
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // add the send the data to the database
      this.contactsDb.addContact(data);

    }


  }

  async deleteContact(contact:{"name":string,"phone":string,"id":string},index:number) {
    
    // create action sheet control
    const actionSheet = await this.actionSheetCtrl.create({
      header: contact.name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler : ()=>{
            // call remove contact function
            this.removeContact(contact.id,index)
          },
          data: {
            action: 'delete',
          }
        },
        {
          text: 'Share',
          handler() {
            console.log(contact.name+"'s Contact Card was shared")
          },
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  public removeContact(contactId:string,index:number) {

    // send request to server
    this.contactsDb.deleteContact(contactId)

    // remove from contact list in view
    this.contacts.splice(index,1);
  }

  

  

  
  
}
