import React, {useState, useEffect} from "react";
import './Itens.css'
import Item from '../componentes/Item';
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import SearchHeader from "../componentes/SearchHeade";
import Sidebar from "../componentes/Sidebar";
import FilterSidebar from "../componentes/FilterSidebar"

import kitkat from '../img/kitkat.png';
import BBgaroto from '../img/BBgaroto.png';
import BarraLacta from '../img/BarraLacta.png';
import Doritos from '../img/Doritos.png';

function Itens () {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (item) => {
        setSelectedItems(prevItems => [...prevItems, item]);
    };

    const [item, setItem] = useState([]);
    const [loadingItem, setLoadingItem] = useState(true);
    const [errorItem, setErrorItem] = useState(null);

    useEffect(() => {
        const fetchItens= async () => {
            try {
              const response = await fetch('http://localhost:3001/itens');
              if (!response.ok) {
                throw new Error('Erro na rede');
              }
              const data = await response.json();
              setItem(data);
            } catch (error) {
              setErrorItem(error.message);
            } finally {
              setLoadingItem(false);
            }
        };
               
    
        fetchItens();
    }, []);

    return (
        <div className="containerItens">
            <Header />
            <div className="containerResultados">
                <FilterSidebar />
                <div className="resultados">
                    <SearchHeader />
                    <div className="resultados-itens">
                        {item.map(item => (
                            <Item key={item.id} item={item} onSelectItem={handleSelectItem} />
                        ))}
                    </div>
                </div>
                <Sidebar selectedItems={selectedItems} />
            </div>
            <Footer />
        </div>
    );
}

export default Itens;