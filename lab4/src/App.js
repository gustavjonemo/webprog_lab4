import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
import ComposeSaladWrapper from "./ComposeSaladWrapper";
import ViewOrder from "./ViewOrder";
import ViewIngredient from "./ViewIngredient";
import Salad from "./legacyFunctions";

const API = 'http://localhost:8080/';
const queries = ["foundations", "proteins", "extras", "dressings"]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.getOrders(),
      inventory: {},
      orderConfirm: null
    };
    this.handleSalad = this.handleSalad.bind(this);
    this.resetOrders = this.resetOrders.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
    this.submitOrders = this.submitOrders.bind(this);
    this.getOrders = this.getOrders.bind(this);

  }
  

  getOrders(){
    if(!!localStorage.getItem("order")){
      const order = JSON.parse(localStorage.getItem("order"));
      return order.map(salad => {
        if (!!salad)
          return new Salad(salad.ingredients, salad.uuid);
        else
          return new Salad();
      });
    } else {
      return []
    }
  }



  componentDidMount() {
    const inventoryTemp = {}

    Promise.all(
      queries.map(query => {
        this.safeFetchJson(API + query)
          .then(ingredients => {
            ingredients.map(ingredient => {
              this.safeFetchJson(API + query + '/' + ingredient)
              .then(ingrProps => inventoryTemp[ingredient] = ingrProps)
            })
          })
      })
    )
    .then(_ => this.setState({inventory: inventoryTemp}))
    .catch(error => console.log(error))

  }

  safeFetchJson(url) {
    return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error("${url} returned status ${response.status}");
      }
      return response.json();
      });
  }

  submitOrders(event) {
    event.preventDefault();
    const tempOrder = [...this.state.order];
    const orderData = tempOrder.map(salad => {
      return Object.keys(salad.ingredients)
    })

    fetch(API + 'orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    }).then(response => response.json())
    .then(data => this.setState({orderConfirm: data}))
    .catch(error => console.log(error));
    
  }

  handleSalad(salad) {
    const tempOrder = [...this.state.order];
    tempOrder.push(salad);
    localStorage.setItem("order", JSON.stringify(tempOrder))
    this.setState({ order: tempOrder });
  }

  resetOrders(event) {
    event.preventDefault();
    this.setState({ order: [] });
    localStorage.clear();
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
              reset={this.resetOrders}
              submit={this.submitOrders}
              orderConfirm={this.state.orderConfirm}
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
