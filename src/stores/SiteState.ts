import { makeAutoObservable } from 'mobx';
import { IPartialImage } from '../types';

class SiteState {
  selectedImage?: IPartialImage | null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedImage(image: IPartialImage | null) {
    this.selectedImage = image;
  }
}

export default new SiteState();
