// src/components/UserList.js

import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [item, setItem] = useState([]);
  const [loadingItem, setLoadingItem] = useState(true);
  const [errorItem, setErrorItem] = useState(null);

  // useEffect(() => {
  //   const fetchUsuarios = async () => {
  //       try {
  //         const response = await fetch('http://localhost:3001/usuarios'); // Atualize para a porta 3000
  //         if (!response.ok) {
  //           throw new Error('Erro na rede');
  //         }
  //         const data = await response.json();
  //         setUsuarios(data);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //   };
           

  //   fetchUsuarios();
  // }, []);

  useEffect(() => {
    const fetchItens= async () => {
        try {
          const response = await fetch('http://localhost:3001/itens'); // Atualize para a porta 3000
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

  // if (loading) return <p>Carregando...</p>;
  // if (error) return <p>Erro: {error}</p>;

  if (loadingItem) return <p>Carregando...</p>;
  if (errorItem) return <p>Erro: {errorItem}</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nome}</li> // Ajuste a propriedade conforme o formato dos dados
        ))}
      </ul>
      <h1>Lista de Itens</h1>
      <ul>
        {item.map((item) => (
          <li key={item.id}>
            {item.nome}, 
            {item.id_item},
            {item.image},
            {item.preco}
          </li> // Ajuste a propriedade conforme o formato dos dados
        ))}
      </ul>
    </div>
  );
};

export default UserList;
