import React from 'react';
import Planche from './Planche';

class Jeu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // On crée une copie du tableau carres après chaque tour pour avoir un historique des coups
      historique: [
        {
        carres: Array(9).fill(null),
      }],
      // Initialisation du jeu. Tour 0
      etapeNumero: 0,
      xEstLeProchain: true,
    };
  }

  // Quand on clique sur un carré
  changerClick(i) {
    // appel du state historique. etapeNumero + 1 
    const historique = this.state.historique.slice(0, this.state.etapeNumero + 1);
    // courant = dernier el du tableau historique ? 
    const courant = historique[historique.length - 1];
    // avec slice on crée une copie du tableau carres
    const carres = courant.carres.slice();
    // Ignorer un click si quelqu'un à gagné le jeu
    if(calculerGagnant(carres) || carres[i]){
      return;
    }
    // Un coup c'est X un coup c'est O
    carres[i] = this.state.xEstLeProchain ? 'X' : 'O';
    // au click on restitue X à chaque carre
    this.setState({
      // contrairement à push(), concat() ne modifie pas le tableau original
        historique: historique.concat([{
          carres: carres
        }]),
        // le numéro du niveau est l'obket historique qui contient la copie du tableau des carrés après chaque tour
        etapeNumero: historique.length,
      // // le bolléen est inversé pour déterminer quel joueur passera ensuite
       xEstLeProchain: !this.state.xEstLeProchain
    });
  }

  // Mettre à jour le tour, le niveau du jeu
  jumpTo(niveau) {
    this.setState({
      // etapeNumreo reflète le déplacement affiché pour l'utilisateur maintenant. On affiche le niveau qu'il veut voir
      etapeNumero: niveau,
      // xEstLeProchain = true si si le nombre si etapeNumero est pair
      xEstLeProchain: (niveau % 2) === 0,
    });
  }

    render() {
      // On met à jour le render pour uilisier la dernière entrée d'historique afin de déterminer et d'afficher l'état du jeu
      const historique = this.state.historique;
      // Quel joureur est entrain de jouer. Ou quel tour ..
      const courant = historique[this.state.etapeNumero];
      const gagnant = calculerGagnant(courant.carres);

      // option du jeu historique
      const tours = historique.map((niveau, move) => {
        const desc = move ?
        'Retourner au tour #' + move : 'Retourner au début du jeu';
        return(
          // quand on crée une liste il faut utiliser key afin que react comprenne quel composant il doit mettre à jour
          <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
        )
      })

      let status; 
      if(gagnant) {
        status = "Le gagnant est : " + gagnant;
      } else {
        status = " Joueur suivant : " + (this.state.xEstLeProchain ? 'X' : 'O')
      }

      return (
        <div className="game">
          <div className="game-board">
            <Planche carres={courant.carres} onClick={i => this.changerClick(i)} />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{tours}</ol>
          </div>
        </div>
      );
    }
  }
  function calculerGagnant(carres) {
    const lignes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i=0; i < lignes.length; i++) {
      const [a, b, c] = lignes[i];
      if(carres[a] && carres[a] === carres[b] && carres[a] === carres[c]){
        return carres[a];
      }
    }
    return null;
  }


  export default Jeu; 


  