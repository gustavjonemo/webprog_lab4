import { useParams } from "react-router-dom";


export default function ViewIngredient(inventory) {
  let { id } = useParams();

  const newArray = inventory.map(({key, value}) => ({ [key]: value }));


  let Extras = Object.keys(inventory).filter(
    name => this.props.inventory[name]
  );

  Extras.forEach((extra, index) => {
    if (state.extras[index]) {
      delishSalad.add(extra, this.props.inventory[extra]);
    }
  });

  return (
    <div className="continer col-12">
      {}
    </div>
  );
}