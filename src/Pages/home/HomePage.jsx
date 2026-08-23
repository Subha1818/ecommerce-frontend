import axios from 'axios'
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';

import { ProductGrid } from './ProductsGrid';
import './HomePage.css';



export function HomePage({cart, loadCart}){

    const[products, setproducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    

    useEffect( () => {
        const getHomeData = async ()=> {

            const url = search
            ? `/api/products?search=${search}`
            : '/api/products';

            const response = await axios.get(url);
            setproducts(response.data);
        }

        getHomeData();

    },[search]);
    

    return (
        <>  
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/Home-favicon.png" />


            <Header cart={cart}/>
            <div className="home-page">
            <ProductGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}