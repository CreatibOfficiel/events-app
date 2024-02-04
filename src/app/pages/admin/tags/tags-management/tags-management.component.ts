import { Component } from '@angular/core';
import { Tag } from '../../../../models/tag.model';
import { TagService } from '../../../../core/tag.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-tags-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tags-management.component.html',
  styleUrl: './tags-management.component.css'
})
export class TagsManagementComponent {
  tags: Tag[] = [];
  tagForm: FormGroup;
  
    constructor(
      private tagService: TagService,
      private formBuilder: FormBuilder
    ) { 
      this.tagForm = this.formBuilder.group({
        name: ['', [Validators.required, this.uniqueNameValidator()]]
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

      if (this.tagForm.invalid) {
        return;
      }

      this.tagService.createTag(tag).subscribe((res) => {
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
        const name = control.value;
        let found = false;
        this.tags.forEach((tag) => {
          if (tag.name === name) {
            found = true;
          }
        });
        return found ? { nameExists: true } : null;
      };
    }

}
