import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { ProductSizeService } from 'src/app/services/product-size.service';

@Component({
  selector: 'app-create-product-size',
  templateUrl: './create-product-size.component.html',
  styleUrls: ['./create-product-size.component.scss']
})
export class CreateProductSizeComponent implements OnInit{
  createProductSize: CreateProductSize = new CreateProductSize();

  constructor(private route: ActivatedRoute,
    private router: Router, private productSizeService: ProductSizeService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
  }

  insertProductSize(){
    this.createProductSize.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    this.productSizeService.createProductSize(this.createProductSize)
    .subscribe(datos=>{
      console.log(datos), (error: any)=>console.log(error)
      this.router.navigate(['product-sizes']);
    });
  }

  goBack(){
    this.router.navigate(['product-sizes']);
  }
}
