import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CardPet = ({ src }) => {
  return (
    <Card>
      <Image src={src} wrapped ui={false} alt="pet image" />
      <Card.Content extra>
        <span className="react-tags">
          <Icon name='like' color='red' link />
        </span>
        <span className="react-tags">
          <Icon name='close' color='blue' link />
        </span>
      </Card.Content>
    </Card>
  )
}

export default CardPet;