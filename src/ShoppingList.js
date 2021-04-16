import React from 'react';

class ShoppingList extends React.Component {
    // render : retourne ce qu'on va voir à l'écran
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }

export default ShoppingList;