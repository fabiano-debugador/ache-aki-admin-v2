
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import axios, { AxiosResponse } from "axios";

type Aluno = {
    id?: string | null;
    nome: string;
    telefone: string;
    pix: string;
};

type SubmitFormProps = {
    preventDefault: () => void; 
}

export function Alunos()  {
    const initialState = { id: null, nome: "", telefone: "", pix: "" }
    const [alunos , setAlunos] = useState<Aluno[]>([]);
    const [aluno, setAluno] = useState<Aluno>(initialState);

    function handleInput (e: React.ChangeEvent<HTMLInputElement>): void {
        const newObj = { ...aluno };
        const { name, value } = e.target;
        setAluno({ ...newObj, [name]: value })
    }

    function create(body: Aluno): void {
        let id = 'id' + (new Date()).getTime();
        const data: Aluno = { ...body, id }
        axios.post('http://localhost:3004/profile', data)
        setAlunos([ ...alunos, data]);
        setAluno(initialState);
    }

    function update(body: Aluno) {
        var index = alunos.map(function(e: Aluno) { return e.id; }).indexOf(body.id);
        alunos[index].nome = body.nome;
        alunos[index].telefone = body.telefone;
        alunos[index].pix = body.pix;
        axios.put('http://localhost:3004/profile/'+aluno.id, body);
        setAlunos([...alunos]);
        setAluno(initialState);
    }

    function getAluno(id: string): void {
        const selectedAluno = alunos.filter((aluno: Aluno) => {return aluno.id === id });
        setAluno(selectedAluno[0])
    }

    function deletar(id: string): void {
        try {
            axios.delete('http://localhost:3004/profile/'+id)
            const listaDeAlunos = alunos.filter((aluno: Aluno) => {return aluno.id !== id })
            setAlunos(listaDeAlunos)
        } catch(e) {
            console.log(e)
        }
    }

    function getUserAccount(): Promise<AxiosResponse<Aluno>> | undefined {
        try{
           return axios.get('http://localhost:3004/profile') 
            
        }catch(e: any) {
            console.log(e)
        }
      }

      useEffect(() => {
       getUserAccount()?.then(function (response: any) {
        setAlunos(response.data)
      })
      .catch(function (error: Error) {
        console.log(error);
      });
      },[])
   
      const submitForm = (event: SubmitFormProps): void => {
        event.preventDefault()

        if (aluno.id) {
            update(aluno)
        } else {
            create(aluno)
        }
      }
  
        return (
            <div>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="nome" value={aluno.nome} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} placeholder="Nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" name="telefone" value={aluno.telefone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} placeholder="Telefone" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Pix</Form.Label>
                        <Form.Control type="text" name="pix" value={aluno.pix} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} placeholder="Pix" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Telefone </td>
                            <td>Pagamento via Pix </td>
                            <td> Opçoes </td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            alunos.map((aluno: any) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.telefone}</td>
                                    <td> {aluno.pix} </td>
                                    {aluno.id && (
                                        <td>
                                            <Button variant="danger" onClick={() => getAluno(aluno?.id)}>Atualizar</Button> / 
                                            <Button variant="danger" onClick={() => deletar(aluno?.id)}>Deletar</Button>
                                        </td>
                                    )}
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

            </div>
        )
    
}

