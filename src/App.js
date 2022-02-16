import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react"; //Ny import
import inventory from "./inventory.ES6"; //Ny import
import ComposeSalad from "./ComposeSalad"; //Ny import
import ViewOrder from "./ViewOrder";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
    this.handleSalad = this.handleSalad.bind(this);
    this.resetOrders = this.resetOrders.bind(this);
  }

  handleSalad(salad) {
    const tempOrder = [...this.state.order];
    tempOrder.push(salad);
    this.setState({ order: tempOrder });
  }

  resetOrders() {
    this.setState({ order: [] });
  }

  render() {
    return (
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <span className="fs-4">Rubrik för labboration 2</span>
        </header>
        <div className="col-12">
          <div className="h-200 p-5 bg-light border rounded-3">
            <h2>Salladsbaren</h2>
            <ViewOrder
              order={this.state.order}
              handleSubmit={this.resetOrders}
            />
            <div className="p-2 SalladStuff">
              <ComposeSalad
                inventory={inventory}
                handleSalad={this.handleSalad}
              />
            </div>
          </div>
        </div>
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogrammering
        </footer>
      </div>
    );
  }
}

export default App;

//Reflection 1
//A functional component is a plane JS function witth props as arguments, returning react elements. No render methods are used.
//Class components extends from react and requires a render method to return react elements.

//Relfection 2
//The render function can fail and halt the program

//Reflection 3
//Yes, react has built in functions for caching such as useMemo()
