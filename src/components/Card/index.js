import { useDrag} from 'react-dnd';

import { Container, Label} from './styled';

export default function Card({ data, listId, cardIndex: cardId }) {

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { listId, cardId },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  return (
    <Container ref={dragRef} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      { data.user && (<img src={data.user} alt="Foto do usuario" />)}
    </Container>
  );
}