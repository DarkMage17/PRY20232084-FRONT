import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductStyle } from 'src/app/models/CreateProductStyle';
import { ProductStyleService } from 'src/app/services/product-style.service';

@Component({
  selector: 'app-create-product-style',
  templateUrl: './create-product-style.component.html',
  styleUrls: ['./create-product-style.component.scss']
})
export class CreateProductStyleComponent implements OnInit{
  createProductStyle: CreateProductStyle = new CreateProductStyle();

  constructor(private route: ActivatedRoute,
    private router: Router, private productStyleService: ProductStyleService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
  }

  insertProductStyle(){
    this.createProductStyle.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    this.productStyleService.createProductStyle(this.createProductStyle)
    .subscribe(datos=>{
      console.log(datos), (error: any)=>console.log(error)
      this.router.navigate(['product-styles']);
    });
  }

  goBack(){
    this.router.navigate(['product-styles']);
  }

  
}
