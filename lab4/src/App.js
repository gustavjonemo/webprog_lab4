import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
//import inventoryImport from "./inventory.ES6";
import ComposeSaladWrapper from "./ComposeSaladWrapper";
import ViewOrder from "./ViewOrder";
import ViewIngredient from "./ViewIngredient";
//import { Link } from "react-router-dom";

const API = 'http://localhost:8080/';
const queries = ["foundations", "proteins", "extras", "dressings"]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      inventory: {}
    };
    this.handleSalad = this.handleSalad.bind(this);
    this.resetOrders = this.resetOrders.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
  }


  
  componentDidMount() {
    queries.forEach((query) => {
      console.log(API + query + "/");
      fetch(API + query + "/")
      .then(response => response.json())
      //.then(data => console.log(typeof data[1]));
      .then(data => this.setState({inventory: Object.assign(this.state.inventory, data)}));
      //.then(data => this.setState({inventory: data}));
    });
    console.log(this.state.inventory);
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
        <Header />
        <Navbar />
        {this.renderRouter()}
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogrammering
        </footer>
      </div>
    );
  }

  renderRouter() {
    return (
      <Routes>
        <Route index path="/" element={<h1 className="p-2">Var hälsad.</h1>} />
        <Route
          path="/compose-salad"
          element={
            <ComposeSaladWrapper
              inventory={this.state.inventory}
              handleSalad={this.handleSalad}
            />
          }
        />
        <Route
          path="/view-order"
          element={
            <ViewOrder
              order={this.state.order}
              handleSubmit={this.resetOrders}
            />
          }
        />
        <Route path="*" element={<h1 className="p-2">404 eller nått</h1>} />
        <Route
          path="/view-ingredient/:name"
          element={<ViewIngredient inventory={this.state.inventory} />}
        />
      </Routes>
    );
  }
}

function Header() {
  return (
    <>
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Salladsbaren</span>
      </header>
    </>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Hem
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/compose-salad">
          Komponera en sallad
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/view-order">
          Se din beställning
        </Link>
      </li>
    </ul>
  );
}