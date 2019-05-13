import React, { useState, useEffect } from 'react'

import { FProductCard } from '../types'


const ProductCard: FProductCard = ({ product }) => {
	const [collapse, setCollapse ] = useState(true)
	let ref:HTMLDivElement | null = null;

	// TODO: solve bug
	// useEffect(() => {
	// 	if (ref) {
	// 		window.scrollTo(0, ref.offsetTop*4)
	// 	}
	// })

	return (
		<div ref={(refe) => {ref = refe}}  className={`col-${collapse ? 6 : 12} col-lg-${collapse ? 2 : 3} my-2`}>
			<div className="card card-shoes" onClick={() => setCollapse(!collapse)}>
				<img className="card-img-top" src={ product.image } alt="Erro carregando a imagem" />
				<div className="card-body">
					<h5 className="card-title text-center">{ product.brand }</h5>
					<div className="container-fluid">
						<div className="row justify-content-center mb-2">
							<p className="card-text text-center text-truncate">{ product.name }</p>
						</div>
						{ !collapse && 
							<div className="row justify-content-center mb-2">
								<p className="card-text text-center text-secondary">{ product.description }</p>
							</div>
						}
						{ !collapse &&
							<div className="row justify-content-center mb-3 no-gutters">
								<div className="w-100 mb-2">
									<p className="card-text text-center text-info">Tamanhos Disponíveis</p>
								</div>
								{
									product.sizes.sort().map((size:string, idx:number) => (
										<div key={ idx } className="col-2 mb-3 text-center">
											<span className="border border-info rounded w-100 p-1">{ size }</span>
										</div>
									))
								}
							</div>
						}
						{ !collapse &&
							<div className="row justify-content-center mb-3 no-gutters">
								<div className="w-100 mb-2">
									<p className="card-text text-center text-info">Cores disponíveis</p>
								</div>
								{
									product.colors.map((color:string, idx:number) => (
										<div key={ idx } className="col-2 text-center">
											<span className="border border-secondary rounded w-100 px-3" 
														style={{backgroundColor: color}} 
											/>
										</div>
									))
								}
							</div>
						}
					<div className="row justify-content-center my-2">
						<p className="card-text text-center text-secondary">{`R$ ${ product.price }`}</p>
					</div>
				</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard