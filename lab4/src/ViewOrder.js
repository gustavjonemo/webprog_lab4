import { Component } from "react";

export default class ViewOrder extends Component {
  render() {
    return (
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h4>Beställning</h4>
          {this.props.order.map((salad) => (
            <div key={salad.uuid} className="form-control form-control-lg">
              {salad.getIngredients() + ", pris: " + salad.getPrice()}
            </div>
          ))}
          <p></p>
          <ul className="nav nav-pills">
          <form onSubmit={this.props.submit}>
            <button type="submit" className="btn btn-primary">
              Lägg Beställning
            </button>
          </form>
          <form onSubmit={this.props.reset}>
            <button type="submit" className="btn btn-secondary">
              Rensa
            </button>
          </form>
          </ul>
        </div>
      </div>
    );
  }
}
