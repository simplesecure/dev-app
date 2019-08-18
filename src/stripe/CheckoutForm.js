// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';
const config = require('../config.json');

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
    // create the PaymentMethod, since there's only one in this group.
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod('card', {billing_details: {name: 'Jenny Rosen'}})
      .then(({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

    // You can also use handleCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our handleCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment
    // this.props.stripe.handleCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', null);

    // You can also use handleCardSetup with the SetupIntents API.
    // See our handleCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-setup
    // this.props.stripe.handleCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', null);

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen',
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/*<AddressSection />*/}
        <CardSection />
        <button style={{marginTop: "20px"}} className="btn-primary btn">Confirm Order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
