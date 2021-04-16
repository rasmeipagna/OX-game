import React from 'react';
import Carre from './Carre';

class Planche extends React.Component {

    placeCarre(i) {
      // La valeur de chaque carré est soit X soit O soit null. Au click on envoie la fonction changerClick
      return (
        <Carre value={this.props.carres[i]} onClick={() => this.props.onClick(i)}/>
      ); 
    }

  
    render() {
  
      return (
        <div>
          <div className="board-row">
            {this.placeCarre(0)}
            {this.placeCarre(1)}
            {this.placeCarre(2)}
          </div>
          <div className="board-row">
            {this.placeCarre(3)}
            {this.placeCarre(4)}
            {this.placeCarre(5)}
          </div>
          <div className="board-row">
            {this.placeCarre(6)}
            {this.placeCarre(7)}
            {this.placeCarre(8)}
          </div>
        </div>
      );
    }
  }



  export default Planche;