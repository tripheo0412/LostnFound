import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import {Api} from "../../providers/api/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  imageFileName:any;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,public api: Api, public http: HttpClient,public media: MediaProvider) {
    this.form = formBuilder.group({
      file: [''],
      title: ['', Validators.required],
      description: ['']
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
        this.form.patchValue({ 'file': 'data:image/jpg;base64,' + data });
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
      this.form.patchValue({ 'file': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['file'].value + ')'
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
    // const settings = {
    //   headers: new HttpHeaders().set('x-access-token',localStorage.getItem('token')
    //   )};
    // console.log(settings);
    // console.log(this.form.value);
    // const body = {
    //   file: this.form.value.file,
    //   title: this.form.value.title
    // }
    // console.log(body);
    // let path = 'http://media.mw.metropolia.fi/wbma/media'
    // let settings = new HttpHeaders().set('content-type', 'multipart/form-data');
    const token = localStorage.getItem('token');
    console.log(token);
    const settings =
    {
      headers: new HttpHeaders().set('x-access-token', token)
    }// const formData: FormData = new FormData();
    //
    // formData.append('files', this.form.value.file);
    // formData.append("title", this.form.value.title);
    //
    // this.http.post(path, formData).subscribe(
    //   (r)=>{console.lchiuog('got r', r)}
    // )
    console.log(this.file);
    const body: FormData = new FormData();
    body.append('file',this.file);
    body.append('title',this.form.value.title);
    this.api.post('media',body,settings).subscribe(r => {
      console.log(r);
    });
    this.viewCtrl.dismiss(this.form.value);

    //this.media.uploadFile(this.a);
  }
}
