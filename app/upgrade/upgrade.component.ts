import { Component, OnInit, NgZone } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { BookService } from '../service/book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  
  getId:any;
  updateForm: FormGroup;


  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private activateRout: ActivatedRoute,
    private ngZone: NgZone,
    private bookService: BookService
  ) {
    this.getId = this.activateRout.snapshot.paramMap.get('id');
    this.bookService.getBook(this.getId).subscribe(res=>{
      console.log(res['book'])
      this.updateForm.setValue({
        name: res['book']['name'],
        price: res['book']['price'],
        description: res['book']['description'],
      });
    });

    this.updateForm = this.formBiulder.group({
      name: [],
      price: [],
      description: [],
    })
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.bookService.updateBook(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        this.ngZone.run(()=> this.router.navigateByUrl('/table-list'))

      }, (err) => {
        console.log(err)
      })
  }


  

}
