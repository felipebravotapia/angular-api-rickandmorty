import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ISearch } from 'src/app/interfaces/ISearch';

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
      criteria: [''],
    });
  }

  get f(){
    return this.reactiveForm.controls
  }

  onSubmit(formName: any): void {
    const data = formName.value.search;
    const criteria = formName.value.criteria;
    this.searchForm({ search: data, criteria });
  }

  searchForm(data: ISearch) {
    this.dataService.searchFn(data);
  }
}
