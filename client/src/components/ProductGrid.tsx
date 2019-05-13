import React from 'react'

import { FProductGrid } from '../types';
import ProductCard from './ProductCard';
import { Alert } from './basic/Alert';


const ProductGrid:FProductGrid = ({ products }) => (
  <>
    { products && products.length ?
      products.map((product, idx) => (
        <ProductCard key={ idx } product={ product } />
      ))
      : 
      <div className="my-3 mx-3">
        <Alert type="info" message="Nenhum produto encontrado." />
      </div>
    }
  </>
)

export default ProductGrid