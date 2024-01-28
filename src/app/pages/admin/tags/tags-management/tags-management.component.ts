import { Component } from '@angular/core';
import { Tag } from '../../../../models/tag.model';
import { TagService } from '../../../../core/tag.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-tags-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tags-management.component.html',
  styleUrl: './tags-management.component.css'
})
export class TagsManagementComponent {
  tags: Tag[] = [];
  newTagName: string = '';
  
    constructor(
      private tagService: TagService
    ) { }

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
        name: this.newTagName
      };

      this.tagService.createTag(tag).subscribe((res) => {
        this.getTags();
      });
    }

    editTag(tagId: number, tag: any) {
      this.tagService.editTag(tagId, tag).subscribe((res) => {
        this.getTags();
      });
    }

}
