import {useEffect} from 'react';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const style = { 'layout': 'vertical', 'color': 'silver'};

export function ButtonWrapper ({ 
  spinner, 
  currency, 
  amount, 
  shipping, 
  international, 
  title, 
  description 
}) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, spinner]);

  return (
    <div className="w-full">
      { (spinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [{
                  amount: {
                    currency_code: currency,
                    value: amount,
                    breakdown: {
                      item_total: {
                        currency_code: currency,
                        value: amount
                      }
                    }
                  },
                  items: [
                    {
                      name: title,
                      description: description,
                      unit_amount: {
                        currency_code: currency,
                        value: amount
                      },
                      quantity: 1
                    }
                  ],
                  shipping: {
                    options: [
                      {
                        id: "SHIP_AUS",
                        label: "Australia Shipping",
                        type: "SHIPPING",
                        selected: true,
                        amount: {
                          value: shipping,
                          currency_code: "AUD"
                        }
                      },
                      {
                        id: "SHIP_INT",
                        label: "International Shipping",
                        type: "SHIPPING",
                        selected: false,
                        amount: {
                          value: international,
                          currency_code: "AUD"
                        }
                      }
                    ]
                  }
                }],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            alert('Order Successful!');
          });
        }}
      />
    </div>
  );
};
