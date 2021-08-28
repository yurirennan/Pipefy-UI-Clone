import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import BoardContext from '../Board/context'

import Card from '../Card';

import { MdAdd } from 'react-icons/md'

import { Container } from './styled';


export default function List({ data, listId,  }) {
  const { move } = useContext(BoardContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item, monitor){
      const grabbedListId = item.listId;
      const targetListId = listId;
      const cardId = item.cardId;

      if(targetListId <= grabbedListId){
        return ;
      }

      if(targetListId > grabbedListId + 1) {
        return ;
      }

      move(grabbedListId, targetListId, cardId);
    }
  });

  return (
    <Container ref={dropRef} done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => <Card key={card.id} data={card} listId={listId} cardIndex={index}  />)}
      </ul>
    </Container>
  );
}