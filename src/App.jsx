import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Navbar from './Components/Navbar/Navbar';
import {getAllPokemon,getPokemon} from './utils/pokemon.js'

function App() {

  const intialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loding,setLoading] = useState(true);
  const [pokemonData,setPokemonData] = useState([]) 
  const [nextURL,setnextURL] = useState("")
  const [previousURL,setpreviousURL] = useState("");

  useEffect(()=>{
    const fetchPokemonData =async () =>{
      //全てのポケモンのデータを取得
      let res = await getAllPokemon(intialURL);

      //各ポケモンのデータの詳細を取得
      loadPokemon(res.results);

      setnextURL(res.next)
      


      setLoading(false)
    }
    fetchPokemonData();

  },[])

const loadPokemon = async (data) =>{
  let _pokemonData = await Promise.all(
    data.map((pokemon)=>{
      //console.log(pokemon);
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    })
  )
  setPokemonData(_pokemonData);
}

const handlePrevPage = async() =>{
  if(!previousURL) return;
  setLoading(true);
  let data = await getAllPokemon(previousURL);
  await loadPokemon(data.results)
  setnextURL(data.next)
  setpreviousURL(data.previous)
  setLoading(false)
}
const handleNextPage = async() =>{
  setLoading(true);
  let data = await getAllPokemon(nextURL);
  //console.log(data)
  await loadPokemon(data.results)
  setnextURL(data.next)
  setpreviousURL(data.previous)
  setLoading(false)
}
  return (
    <>
    <Navbar/>
    <div className="App">
    {loding ? 
    (<h1>ロード中。。。</h1>) :
    <>
    <div className='pokemonCardContainer'>
      {pokemonData.map((pokemon,index)=>{
        return <Card key={index} pokemon ={pokemon} />

      })}
    </div>

    <div className='btn'>
    <button onClick={handlePrevPage}>前へ</button>
    <button onClick={handleNextPage}>次へ</button>

    </div>

    

    </>
  }
    </div>
    </>
  );
}

export default App;
