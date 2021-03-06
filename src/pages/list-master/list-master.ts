import { Component } from '@angular/core';
import {IonicPage, ModalController, Nav, NavController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { FoundPage } from '../found/found';
import {SettingsPage} from '../settings/settings';
import {User} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items,
              public modalCtrl: ModalController,
              public user: User,
              public nav: Nav) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewWillEnter() {
    this.items.getList();
  }
  ionViewDidLeave() {
    this.items.reset();
  }



  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  /////
  openSettings(item: Item) {
    this.navCtrl.push('SettingsPage', {
      item: item
    });
  }
  logout() {
    this.items.reset();
    this.user.logout();
    this.nav.setRoot('WelcomePage');
    this.nav.popToRoot();
  }
}
