import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public models;
  selectedFile: File;
  public formsModels: FormGroup;
  public mySrc: any = "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_960_720.png";
  public type = "models";
  @ViewChild('img') image: ElementRef;
  constructor(
    private http : HttpClient,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
    ) {
  }

  public formsInit(){
    this.formsModels = this.fb.group(
      {
        forms: this.fb.array([])
      }
    )
    console.log('Форма создалась');
    
  }

  public createItem(model) : FormGroup{
    return this.fb.group({
      id: model['id'],
      name: model['name'],
      img: model['img']
    });
  }

  forms;
  public addForms(models){
    for (const model of models) {
      console.log('Модель єдд');
      this.forms = this.formsModels.get('forms') as FormArray;
      this.forms.push(this.createItem(model));
    }
    console.log(this.forms);
  }

  onFileChanged(event, targerId) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
    const blob = new Blob([this.selectedFile]);

    /* get name & file_url from Blob */
    const myFile = this.blobToFile(blob, this.selectedFile.name);
    const objectURL = URL.createObjectURL(myFile);
    /* set data for image object */
    // this.documentList[targerId]['image'].name = myFile.name;
    this.mySrc = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    console.log(this.mySrc);
  }

  onFileChanged2(event, model: FormGroup) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedFile = event.target.files[0];
    const blob = new Blob([this.selectedFile]);

    /* get name & file_url from Blob */
    const myFile = this.blobToFile(blob, this.selectedFile.name);
    const objectURL = URL.createObjectURL(myFile);
    /* set data for image object */
    // this.documentList[targerId]['image'].name = myFile.name;
    model.controls['img'].patchValue(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return theBlob as File;
  }


  public editModel(model : FormGroup){
    let data = {
      model: {
        id: model['id'].value,
        name: model['name'].value,
        img: model['img'].value,
      }
    }
    let unsub = this.http.post(environment.baseUrl+'save-model.php',data, {responseType: 'text'}).subscribe(res => {
      this.models = res['models'];
    },
    err =>{
      console.log(err.error);
    });   
  }
  ngOnInit() {
    this.formsInit();
    let unsub = this.http.get(environment.baseUrl+'models.php', {responseType: 'json'}).subscribe(res => {
      this.models = res['models'];
      console.log(this.models);
      
      this.addForms(this.models);
    },
    err =>{
      console.log(err.error);
    });   
    this.formsModels.valueChanges.subscribe(res=>{
      console.log(res);
      
    }) 
}
}
