import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {IonicPage, NavController, ToastController, ViewController} from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  file: File;

  isReadyToSave: boolean;

  imageURI:any;

  item: any;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public media: MediaProvider,
    public toastCtrl: ToastController)
    {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        quality:100
      }).then((data) => {
        this.imageURI = data;
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {

      console.log('initiated');
      this.fileInput.nativeElement.click();
      console.log('sucess');
    }
  }



  processWebImage(event: any) {
    this.file = event.target.files[0];
    console.log(event.target.files[0]);
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    console.log(this.file);
    const body: FormData = new FormData();
    body.append('file',this.file);
    body.append('title',this.form.value.name);
    this.media.uploadFile(body);
    this.viewCtrl.dismiss(this.form.value);
  }
}
