import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { BookService } from '../service/book.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  

  bookForm: FormGroup;

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private bookService: BookService
  ) {
     this.bookForm = this.formBiulder.group({
       name: [''],
       price: [''],
       description: [''],
     })
  }

  ngOnInit(): void {
  }

  onSubmit():any{
    this.bookService.addBook(this.bookForm.value)
    this.router.navigateByUrl('/table-list')
   
  }


}
