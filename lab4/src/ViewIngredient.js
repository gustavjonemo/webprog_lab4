import { useParams } from "react-router-dom";

export default function ViewIngredient(props) {
  const id = useParams().name.substring(1);

  if (props.inventory[id]) {
    let ingredient = props.inventory[id];
    const { extra, price, ...ingredientSpec } = ingredient;
    return (
      <div className="p-3">
        {id + " egenskaper: " + Object.keys(ingredientSpec)}
      </div>
    );
  } else {
    return <div className="p-3">No such ingredient</div>;
  }
}
