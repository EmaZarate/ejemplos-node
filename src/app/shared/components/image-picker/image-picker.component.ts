import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {

  imageSource = '../../../../assets/local_offer.png';

  isUploadedByUser = false;

  @Input() disabled = true;
  @Input() imgParent = '';

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if (this.imgParent && this.imgParent.length > 0) {
      this.imageSource = this.imgParent;
      this.isUploadedByUser = true;
    }
  }


  onPictureSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (eventReader: any) => { // called once readAsDataURL is completed
        this.imageSource = eventReader.target.result;
        this.isUploadedByUser = true;

        this.change.emit(this.imageSource);
      };
    }
  }

  containerEnabled() {
    if (!this.disabled) {
      return 'container-enabled';
    }
  }

  pictureEnabled() {
    if (!this.disabled) {
      return 'picture-enabled';
    }
  }

  pictureDefaultWidth() {
    if (!this.isUploadedByUser) {
      return 'picture-default-width';
    }
  }
}
