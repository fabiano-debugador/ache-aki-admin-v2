import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Alunos } from './Components/Alunos';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('fetchUsers', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('Testing CRUD', () => {
    const studants = [
      {
        id: 'id1676981397699',
        nome: 'mario',
        telefone: '11 90797979',
        pix: '7979/0900-98',
      },
      {
        id: 'id1677083499896',
        nome: 'Valentino Rossi',
        telefone: '',
        pix: '',
      },
      {
        id: 'id1677102891363',
        nome: 'Jéssica',
        telefone: '19 9098098080',
        pix: 'jessica@mail.com',
      },
    ];
    it('load page', async () => {
      mock.onGet(`http://localhost:3004/profile`).reply(200, studants);

      const { findAllByTestId } = render(<Alunos />);

      const text = await findAllByTestId('listOfStudants');

      expect(text).toHaveLength(3);
    });

    it('create studant', async () => {
      const studants = [
        {
          id: 'id1676981397699',
          nome: 'mario',
          telefone: '11 90797979',
          pix: '7979/0900-98',
        },
        {
          id: 'id1677083499896',
          nome: 'Valentino Rossi',
          telefone: '',
          pix: '',
        },
        {
          id: 'id1677102891363',
          nome: 'Jéssica',
          telefone: '19 9098098080',
          pix: 'jessica@mail.com',
        },
      ];

      mock.onGet(`http://localhost:3004/profile`).reply(200, studants);

      const { findAllByTestId, getByTestId } = render(<Alunos />);
      const fieldName = getByTestId('nome');
      const submit = getByTestId('submit-button');
      let allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants).toHaveLength(3);

      fireEvent.change(fieldName, { target: { value: 'ruberley' } });

      mock.onPost('http://localhost:3004/profile').reply(200);

      fireEvent.click(submit);

      studants.push({
        id: 'id1677102891674',
        nome: 'ruberley',
        telefone: '19982266776',
        pix: '83888337367',
      });

      allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants).toHaveLength(4);
    });

    it('Update studant', async () => {
      const studants = [
        {
          id: 'id1676981397699',
          nome: 'mario',
          telefone: '11 90797979',
          pix: '7979/0900-98',
        },
        {
          id: 'id1677083499896',
          nome: 'Valentino Rossi',
          telefone: '',
          pix: '',
        },
        {
          id: 'id1677102891363',
          nome: 'Jéssica',
          telefone: '19 9098098080',
          pix: 'jessica@mail.com',
        },
      ];

      mock.onGet(`http://localhost:3004/profile`).reply(200, studants);

      const { findAllByTestId, getByTestId } = render(<Alunos />);
      const fieldName = getByTestId('nome');
      const submit = getByTestId('submit-button');
      const buttonUpdate = await screen.findAllByTestId('update');
      let allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants).toHaveLength(3);

      fireEvent.click(buttonUpdate[0]);
      fireEvent.change(fieldName, { target: { value: 'mario e luigi' } });

      mock.onPut('http://localhost:3004/profile/id1676981397699').reply((config) => {
        expect(JSON.parse(config.data)).toEqual({
          id: 'id1676981397699',
          nome: 'mario e luigi',
          telefone: '11 90797979',
          pix: '7979/0900-98',
        });
        return [200];
      });

      fireEvent.click(submit);

      allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants[0]).toMatchSnapshot();
    });

    it('Delete studant', async () => {
      const studants = [
        {
          id: 'id1676981397699',
          nome: 'mario',
          telefone: '11 90797979',
          pix: '7979/0900-98',
        },
        {
          id: 'id1677083499896',
          nome: 'Valentino Rossi',
          telefone: '',
          pix: '',
        },
        {
          id: 'id1677102891363',
          nome: 'Jéssica',
          telefone: '19 9098098080',
          pix: 'jessica@mail.com',
        },
      ];

      mock.onGet(`http://localhost:3004/profile`).reply(200, studants);

      const { findAllByTestId } = render(<Alunos />);
      const deleteButton = await screen.findAllByTestId('delete');
      let allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants).toHaveLength(3);

      mock.onDelete('http://localhost:3004/profile/id1676981397699').reply(204);

      fireEvent.click(deleteButton[0]);

      allStudants = await findAllByTestId('listOfStudants');

      expect(allStudants).toHaveLength(2);
    });
  });
});
