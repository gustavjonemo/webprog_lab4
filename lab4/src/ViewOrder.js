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
          <form onSubmit={this.props.handleSubmit}>
            <button type="submit" className="btn btn-primary">
              Återställ
            </button>
          </form>
        </div>
      </div>
    );
  }
}
