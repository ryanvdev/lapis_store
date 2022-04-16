import * as React from 'react';

export interface IProductCardProps {
    // id?:string;
    // slug?:string;
    // img?:string;
    // title?:string;
    // price?:number;
    // discount?:number;
    // summary?:string;
}

const tmpImg:string = "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/265x/9df78eab33525d08d6e5fb8d27136e95/1/1/11pr-b.jpg";

export default function ProductCard (props: IProductCardProps) {
    return (
        <div className='product-card'>
            {/* <div className='discount-percent'>
                <div></div>
            </div>
            <div className='product-image'>
                <img src={tmpImg} alt="" />
            </div>
            <div className='title'>
                <h3>{props.title}</h3>
            </div>
            <div className='price'>
                <strong className='current-price'></strong>
                <strong className='price'></strong>
            </div>
            <div>
                {props.summary}
            </div> */}
        </div>
    );
}
