import React, { useState, useEffect } from 'react'

import Layout from '../components/layout/Layout'

import { useAxios } from '../effects/axios'
import { Product } from '../types';
import ProductGrid from '../components/ProductGrid';
import { Alert } from '../components/basic/Alert';


const ShoesView:React.FC<{path:string}> = (props) => {
	const shoesState:{next:string, shoes:any[]} = {
		next:'http://localhost:8000/api/shoes/', 
		shoes:[]
	}
	const [{ next, shoes }, setShoes] = useState(shoesState)
	const { data, error, isRequesting, setSendRequest } = useAxios(next)

	useEffect(() => {
		setSendRequest(true)
	}, [])

	useEffect(() => {
		data && data.results && setShoes({ next: data.next, shoes: [...shoes, ...data.results] })
	}, [data,])

	return (
		<>
			<div className="container-fluid">
				<div className="row mt-2">
					{ isRequesting ? <p>Carregando...</p>
						: error ? <Alert type='danger' message="Problema ao conectar ao servidor. Tente novamente mais tarde." />
						: data && 
						<ProductGrid products={ shoes as Product[] } />
					}
				</div>
				<div className="row my-2">
					<button className="btn btn-primary w-100 rounded-0 shadow-lg"
						onClick={ () => setSendRequest(true) }
					>+</button>
				</div>
			</div>
		</>
	)
}

export default Layout(ShoesView)