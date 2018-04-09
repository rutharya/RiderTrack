import { Component, OnInit } from '@angular/core';
import { MapService} from '../shared/services/maps.service';
import { UploadFileService} from '../shared/services/uploadFile.service';
import {FileUpload} from '../shared/models/fileupload';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};


  constructor(private _mapService: MapService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this._mapService.plotActivity();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
}
