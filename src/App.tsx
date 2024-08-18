import './App.css'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'

interface ICategoria {
  id: string;  
  nome: string;  
  desc: string;  
}

function App() {
  const url = "http://localhost:3000/categoria"

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");

  const [classInserir, setClassInserir] = useState("")
  const [classEditar, setClassEditar] = useState("sumir")
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(res => setData(res.data))
  }, [data, setData]);

  const Inserir = () => {
    axios.post(url, {
      nome,
      desc
    })
  }

  const Cadastrar = (event: FormEvent) => {
    event.preventDefault();

    if (nome === "") {
      alert("Insira um nome da Categoria!!")
    } else if (desc === "") {
      alert("Insira uma descrição da Categoria!!")
    } else {
      alert("Cadastrando...")
    }

    Inserir();
  }
  
  const Remover = (id: string) => {
    // alert("Deletando no id: " + id)

    setId(id)

    axios.delete(url + "/" + id)
  }

  const Carregar = (id: string, nome: string, desc: string) => {
    // alert("id: " + id + " nome: " + nome + " Desc: " + desc)
    
    setId(id)
    setNome(nome)
    setDesc(desc)

    setClassEditar("")
    setClassInserir("sumir")
  }

  const Editar = (event: FormEvent) => {
    event.preventDefault();

    axios.put(url + "/" + id, {
      nome,
      desc
    })
    .then(() => {
      setId("")
      setNome("")
      setDesc("")

      setClassEditar("sumir")
      setClassInserir("")
    })
  }

  return (
    <div className="container">
      <h1>Cadastro de Categorias</h1>

      <form className='mt-5 mb-4'>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder='Nome da Categoria'
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="text"
              placeholder='Descricao da Categoria'
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex items-start gap-2">
          <button className={`btn btn-success rounded-md ${classInserir}`} onClick={Cadastrar}>Inserir</button>
          <button className={`btn btn-warning rounded-md ${classEditar}`} onClick={Editar}>Alterar</button>
        </div>
      </form>

      <table className="table table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Categoria</td>
            <td>Descrição</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item: ICategoria) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td className='mx-2'>{item.desc}</td>
              <td className='mx-2'>
                <button className='btn btn-warning mx-2' onClick={() => Carregar(item.id, item.nome, item.desc)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className='btn btn-danger' onClick={() => Remover(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App