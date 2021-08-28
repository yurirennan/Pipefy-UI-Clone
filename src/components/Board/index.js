import { useState } from 'react';
import produce from 'immer'

import BoardContext from './context';

import List from '../List'

import { loadLists } from '../../services/api'

import { Container } from './styled'

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, cardIndex) {
    //produce recebe a lista e uma função em que o parametro draft é a copia do
    //1 parametro
    setLists(produce(lists, draft => {
      const cardGrabbed = draft[fromList].cards[cardIndex];

      draft[fromList].cards.splice(cardIndex, 1);
      draft[toList].cards.push(cardGrabbed);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} data={list} listId={index} />)}
      </Container>
    </BoardContext.Provider>
  );
}