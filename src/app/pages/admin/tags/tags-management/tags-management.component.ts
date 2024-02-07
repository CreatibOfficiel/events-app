import { Component } from '@angular/core';
import { Tag } from '../../../../models/tag.model';
import { TagService } from '../../../../core/tag.service';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-tags-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './tags-management.component.html',
  styleUrl: './tags-management.component.css'
})
export class TagsManagementComponent {
  tags: Tag[] = [];
  tagForm: FormGroup;
  faArrowLeft = faArrowLeft;
  
    constructor(
      private tagService: TagService,
      private formBuilder: FormBuilder,
      private _location: Location
    ) { 
      this.tagForm = this.formBuilder.group({
        name: ['', [Validators.required]]
      });
    }

    ngOnInit(): void {
      this.getTags();
    }

    getTags() {
      this.tagService.getAllTags().subscribe((tags) => {
        this.tags = tags;
      });
    }

    deleteTag(tagId: number) {
      this.tagService.deleteTag(tagId).subscribe((res) => {
        this.getTags();
      });
    }

    createTag() {
      let tag = {
        name: this.tagForm.value.name
      };

      console.log("createTag");

      if (this.tagForm.invalid) {
        console.log("invalid form");
        return;
      }

      this.tagService.createTag(tag).subscribe((res) => {
        console.log(res);
        this.getTags();
      });
    }

    editTag(tagId: number, tag: any) {
      this.tagService.editTag(tagId, tag).subscribe((res) => {
        this.getTags();
      });
    }

    uniqueNameValidator() {
      return (control: any) => {
        if (this.tags && this.tags.length > 0) {
          if (this.tags.map(tag => tag.name).includes(control.value)) {
            return { uniqueName: true };
          }
        }
        return null;
      };
    }

    backClicked() {
      this._location.back();
    }
    

}
