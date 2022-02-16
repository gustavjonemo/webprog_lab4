import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react"; //Ny import
import inventory from "./inventory.ES6"; //Ny import
import ComposeSalad from "./ComposeSalad"; //Ny import
import ViewOrder from "./ViewOrder";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
    this.handleSalad = this.handleSalad.bind(this);
    this.resetOrders = this.resetOrders.bind(this);
    this.renderPageContent = this.renderPageContent.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
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
        {this.renderRouter}
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogrammering
        </footer>
      </div>
    );
  }
  renderPageContent() {
    return (
      <>
        <ViewOrder order={this.state.order} handleSubmit={this.resetOrders} />
        <ComposeSalad inventory={inventory} handleSalad={this.handleSalad} />
      </>
    );
  }

  renderRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="ComposeSalad"
            element={
              <ComposeSalad
                inventory={inventory}
                handleSalad={this.handleSalad}
              />
            }
          />
          <Route
            path="ViewOrder"
            element={
              <ViewOrder
                order={this.state.order}
                handleSubmit={this.resetOrders}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Salladsbaren</span>
    </header>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/ComposeSalad">
          Komponera en sallad
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/ViewOrder">
          Se din beställning
        </Link>
      </li>
      {/* more links */}
    </ul>
  );
}

export default App;
