import React, { useState, useEffect } from "react";
import './Itens.css';
import Item from '../componentes/Item';
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import SearchHeader from "../componentes/SearchHeader";
import Sidebar from "../componentes/Sidebar";
import FilterSidebar from "../componentes/FilterSidebar";
import { useNavigate } from 'react-router-dom'; // Substituído 'useHistory' por 'useNavigate'

function Itens () {
    const [selectedItems, setSelectedItems] = useState([]);
    const [item, setItem] = useState([]);
    const [loadingItem, setLoadingItem] = useState(true);
    const [errorItem, setErrorItem] = useState(null);
    const navigate = useNavigate(); // Substituído 'useHistory' por 'useNavigate'

    const handleSelectItem = (item) => {
        setSelectedItems(prevItems => [...prevItems, item]);
    };

    const handleFinish = async () => {
        try {
            const response = await fetch('http://localhost:3001/calcular-preco', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itensSelecionados: selectedItems.map(item => item.id_item) })
            });
            const data = await response.json();
            navigate('/match', { state: { supermercadoMaisBarato: data.supermercadoMaisBarato, menorPreco: data.menorPreco } });
        } catch (error) {
            console.error('Erro ao finalizar a seleção:', error);
        }
    };

    useEffect(() => {
        const fetchItens = async () => {
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
                        {loadingItem ? (
                            <h2>Carregando itens...</h2>
                        ) : errorItem ? (
                            <h2>Erro: {errorItem}</h2>
                        ) : (
                            item.map(item => (
                                <Item key={item.id_item} item={item} onSelectItem={handleSelectItem} />
                            ))
                        )}
                    </div>
                </div>
                <Sidebar selectedItems={selectedItems} onFinish={handleFinish} />
            </div>
            <Footer />
        </div>
    );
}

export default Itens;
