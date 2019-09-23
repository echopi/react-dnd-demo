import React, { useState, useCallback, useEffect } from "react";
import Card from "./Card";
import update from "immutability-helper";
import { SortbyMap, fetchItems, postDoctorOrders } from "./service";
const style = {
  width: '100%'
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const Container: React.FC = () => {
  const [cards, setCards] = useState<Item[]>([]);
  const [loading, setLoading] =  useState(false);

  useEffect(() => {
    fetchItems().then(setCards);
  }, []);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        })
      );
    },
    [cards]
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };
  const onSubmit = useCallback(async () => {
    const sortby: SortbyMap = cards
      .map((item, i) => {
        return [item.id, i];
      })
      .reduce<SortbyMap>((pre, cur) => {
        pre[cur[0]] = cur[1];
        return pre;
      }, {});
    setLoading(true);
    await postDoctorOrders(sortby);
    setLoading(false);
  }, [cards]);

  return (
    <>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      {cards.length?<button onClick={onSubmit} disabled={loading?true:false}>提交</button>:''}
    </>
  );
};

export default Container;
