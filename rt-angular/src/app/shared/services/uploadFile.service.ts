import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from '../models/fileupload';

@Injectable()
export class UploadFileService {

  constructor(private db: AngularFireDatabase) {}

  private basePath = '/uploads/gpxFiles';
  private baseImagePath = '/uploads/ImageFiles';
  private baseProfilePath = '/uploads/ImageFiles/Profile'
  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
        // downloadUrl = fileUpload.url;
        console.log(fileUpload.url);
        return fileUpload.url;
      }
    );
  }

  pushImageFileToStorage(fileUpload: FileUpload, progress: {percentage: number}): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.baseImagePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveImageFileData(fileUpload);
        // downloadUrl = fileUpload.url;
        console.log(fileUpload.url);
        return fileUpload.url;
      }
    );
  }
  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }
  private saveImageFileData(fileUpload: FileUpload) {
    this.db.list(`${this.baseImagePath}/`).push(fileUpload);
  }
  pushProfileImageFileToStorage(fileUpload: FileUpload): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.baseProfilePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        // const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveProfileFileData(fileUpload);
        // downloadUrl = fileUpload.url;
        console.log(fileUpload.url);
        return fileUpload.url;
      }
    );
  }
  private saveProfileFileData(fileUpload: FileUpload) {
    this.db.list(`${this.baseProfilePath}/`).push(fileUpload);
  }
}

