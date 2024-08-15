import React, {useState} from "react";
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

    const itens = [
        {
            id: 1,
            image: kitkat,
            name: 'Chocolate kit kat ao leite nestlé - 41,5g',
            price: 2.99
        },
        {
            id: 2,
            image: BBgaroto,
            name: 'Caixa de bombom garoto 250g',
            price: 11.99
        },
        {
            id: 3,
            image: BarraLacta,
            name: 'Barra de chocolate ao leite 80g',
            price: 5.99
        },
        {
            id: 4,
            image: Doritos,
            name: 'Salgadinho doritos queijo nacho 75g',
            price: 9.99
        },
        {
            id: 5,
            image: BBgaroto,
            name: 'Caixa de bombom garoto 250g',
            price: 11.99
        },
        {
            id: 6,
            image: BarraLacta,
            name: 'Barra de chocolate ao leite 80g',
            price: 5.99
        },
        {
            id: 7,
            image: Doritos,
            name: 'Salgadinho doritos queijo nacho 75g',
            price: 9.99
        },
    ]

    return (
        <div className="containerItens">
            <Header />
            <div className="containerResultados">
                <FilterSidebar />
                <div className="resultados">
                    <SearchHeader />
                    <div className="resultados-itens">
                        {itens.map(item => (
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