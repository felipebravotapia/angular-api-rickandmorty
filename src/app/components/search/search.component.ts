import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor(public fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      search: ['', [Validators.required]],
    });
  }

  onSubmit(formName: any): void {
    const data = formName.value.search;
    this.searchForm(data);
  }

  searchForm(data: string) {
    this.dataService.searchFn(data);
  }
}
