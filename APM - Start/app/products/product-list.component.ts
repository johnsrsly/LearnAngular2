import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {IProduct} from './product';
import {ProductFilterPipe} from './product-filter.pipe';
import {StarComponent} from '../shared/star.component'
import {ProductService} from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent, 
                ROUTER_DIRECTIVES]
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imgWidth: number = 50;
    imgMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    products: IProduct[];
    errorMessage: string;
    
    constructor(private _productService: ProductService){
       
    }
    
    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    
    ngOnInit(): void{
        this._productService.getProducts()
        .subscribe(p => this.products = p, e => this.errorMessage = <any>e)
    }
    
    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: '+message;
    }
}