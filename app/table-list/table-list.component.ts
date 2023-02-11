import { Component, NgZone, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  

  constructor(
    private bookService: BookService,
    public router:Router,
    private ngZone:NgZone,
    ) {


  }

  page = 1;
	pageSize = 4;
  Book:any = [];



  ngOnInit(): void {
    this.bookService.getBooks().subscribe( res=>{
      console.log(res)
      this.Book = res;
    })
  }


  delete(id:any,i:any){
    console.log(id);
     this.bookService.deleteBook(id).subscribe(res => {
           console.log ('Données supprimées avec succès')
           this.router.navigateByUrl ('/user-profile')
           }, (err) => {
           console.log (err)

          })
  }
}
