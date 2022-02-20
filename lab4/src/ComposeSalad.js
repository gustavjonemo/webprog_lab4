import { Component } from "react";
import { Link } from "react-router-dom";
import Salad from "./legacyFunctions";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: "",
      protein: "",
      dressing: "",
      extras: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.target.parentElement.classList.add("was-validated");
    if (event.target.name === "extras") {
      let pos = event.target.id;
      let tempArray = [...this.state.extras];
      tempArray[pos] = !tempArray[pos];
      this.setState({ extras: tempArray });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      event.target.classList.add("was-validated");
    } else {
      let tempExtras = Object.keys(this.props.inventory).filter(
        (name) => this.props.inventory[name].extra
      );

      let state = this.state;

      let delishSalad = new Salad()
        .add(state.foundation, this.props.inventory[state.foundation])
        .add(state.protein, this.props.inventory[state.protein]);

      tempExtras.forEach((extra, index) => {
        if (state.extras[index]) {
          delishSalad.add(extra, this.props.inventory[extra]);
        }
      });

      delishSalad.add(state.dressing, this.props.inventory[state.dressing]);

      this.props.handleSalad(delishSalad);

      this.setState({
        foundation: "",
        protein: "",
        extras: [],
        dressing: ""
      });

      this.props.navigate("/view-order");
    }
  }

  render() {
    let foundation = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].foundation
    );

    let protein = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].protein
    );

    let extras = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].extra
    );

    let dressing = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].dressing
    );

    return (
      <div className="continer col-12">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="row h-200 p-5 bg-light border rounded-3">
            <h2>Välj innehållet i din sallad</h2>
            <div>
              <div>
                <label className="p-1">
                  Välj bas:{" "}
                  <select
                    className="form-select"
                    name="foundation"
                    value={this.state.foundation}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Gör ett val</option>
                    {foundation.map((name) => (
                      <option key={name} value={name}>
                        {name}{" "}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Välj en bas.</div>
                </label>
                <div>
                  <label className="p-1">
                    Välj gainz:{" "}
                    <select
                      className="form-select"
                      name="protein"
                      value={this.state.protein}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Gör ett val</option>
                      {protein.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Välj ett protein.</div>
                  </label>
                </div>
              </div>
            </div>
            <h5 className="p-3"> Välj tillbehör: </h5>
            {extras.map((name, index) => (
              <div key={name} className="col-4">
                <input
                  type="checkbox"
                  checked={!!this.state.extras[index]}
                  name="extras"
                  id={index}
                  value={this.state.extras}
                  onChange={this.handleChange}
                />{" "}
                <Link to={"/view-ingredient/:" + name}>{name}</Link>
              </div>
            ))}
            <label className="p-1">
              Välj dressing:{" "}
              <select
                className="form-select"
                name="dressing"
                value={this.state.dressing}
                onChange={this.handleChange}
                required
              >
                <option value="">Gör ett val</option>
                {dressing.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Välj en dressing.</div>
            </label>
          </div>
          <div className="form-group">
            <p></p>
            <button type="submit" className="btn btn-primary" value="Submit">
              Skapa salad
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ComposeSalad;
