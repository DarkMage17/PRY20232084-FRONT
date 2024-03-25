import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';

@Component({
  selector: 'app-create-product-size',
  templateUrl: './create-product-size.component.html',
  styleUrls: ['./create-product-size.component.scss']
})
export class CreateProductSizeComponent implements OnInit{
  createProductSize: CreateProductSize = new CreateProductSize();
  loggedUser: any;

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private productSizeService: ProductSizeService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
  }

  insertProductSize(){
    this.createProductSize.createdBy = this.loggedUser.id;
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
