import { Component } from "react";

/*
const { useState, useEffect, useRef } = React;
const { Toast } = bootstrap;

function ToastDemo() {
    var [toast, setToast] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        var myToast = toastRef.current
        var bsToast = bootstrap.Toast.getInstance(myToast)
        
        if (!bsToast) {
            // initialize Toast
            bsToast = new Toast(myToast, {autohide: false})
            // hide after init
            bsToast.hide()
            setToast(false)
        }
        else {
            // toggle
            toast ? bsToast.show() : bsToast.hide()
        }
    })

    return (
    <div className="py-2">
        <button className="btn btn-success" onClick={() => setToast(toast => !toast)}>
            Toast {toast?'hide':'show'}
        </button>
        <div className="toast position-absolute m-4" role="alert" ref={toastRef}>
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
        </div>
    </div>
    )
}
*/


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
        {this.renderConf()}
      </div>
    );
  }
  renderConf() {
    if(this.props.orderConfirm) {
     return <p>Beställnings-ID: {this.props.orderConfirm.uuid}</p>;
    } else
      return "";
  }
}
