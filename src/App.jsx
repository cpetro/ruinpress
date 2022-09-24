import React, { 
  Component, 
  useEffect 
} from 'react';

import Papa from 'papaparse';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams, 
  Navigate
} from "react-router-dom";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

class GoogleSheetsData extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSVTHz5EiCM1TIBUvHuHFXKYG-2MFWtq3Qcvnc35wB3nGBgn35XTfb6i4ByorPAqOJMVQdJZKl-_Uv8/pub?output=csv', {
      download: true,
      header: true,
      complete: (results) => {
        this.setState({
          data: results.data
        });
      }
    });
  }

  render () {

    const { data } = this.state;
    // console.log('updated state --->', data);

    return (
      <div className="App">
        <Router>
          <div className="w-full bg-black text-white">
            <div className="header flex flex-col gap-4 md:gap-8 p-4 py-8 md:px-8 lg:px-16 lg:py-16 max-w-screen-lg mx-auto">
              <h1 className="leading-none">
                <Link to="/">
                  Ruin Press
                </Link>
              </h1>
              <ul className="list-inside list-disc">  
                {
                  data.map(obj => {
                    return (
                      <PageList key={obj.id} data={obj} />
                    )
                  })
                }
              </ul>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":id" element={<PageDetail { ...data } />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

function PageList(props) {
  const { data } = props;
  return (
    <li>
      <Link to={`/${data.id}`}>
        {data.title}
      </Link>
    </li>
  );
}

function Home() {
  return (
    <div className="hidden">
      <h1>Hello World !</h1>
    </div>
  )
}

function PageDetail(props) {

  const { id } = useParams();

  const data = Object.values(props).filter((data) => data.id === id);
  // console.log(data.length );

  if (data.length !== 0) {
    const id = data[0].id;
    const title = data[0].title;
    const subtitle = data[0].subtitle;
    const price = parseInt(data[0].price);
    const shipping = parseInt(data[0].shipping);
    const international = parseInt(data[0].international);
    const description = data[0].description;
    const content = data[0].content;
    const img1 = data[0].img1;
    const img2 = data[0].img2;
    const img3 = data[0].img3;

    // console.log(price);

    return (
      <div className="w-full bg-white text-accent">
        <div className="flex flex-cols-1 flex-col md:flex-row-reverse gap-4 md:gap-8 lg:gap-16 p-4 md:p-8 lg:p-16 max-w-screen-lg mx-auto">
          <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-8 relative">
            { img1.length !== 0 &&
              <img className="w-full" alt={ id } src={ img1 } />
            }
            { img2.length !== 0 &&
              <img className="w-full" alt={ id } src={ img2 } />
            }
            { img3.length !== 0 &&
              <img className="w-full" alt={ id } src={ img3 } />
            }
          </div>
          <div className="flex flex-col w-full md:w-2/3 gap-4 md:gap-8 md:self-start">
            { title.length !== 0 &&
              <h1 className="leading-none">{ title }</h1>
            }
            { subtitle.length !== 0 &&
              <p>{ subtitle }</p>
            }
            { content.length !== 0 &&
              <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
            }
            { price > 0 ?

              <ButtonWrapper spinner="false" currency="AUD" amount={ price } shipping={ shipping } international={ international} title={ title } description={ description }/>
              :
              <p>Sold out!</p>
            }
          </div>
        </div>
      </div>
    )
  } else {
    <Navigate to="/" />
  }

}

const PAYPAL_CLIENT_ID = {
  clientId: 'AQacwHFoxXwz1IuIG4g5rG6xFtLxJmwFjf3OhyT_HheCCxfnFxnlm7VccmXzFD3MNVJqb_xY6LDnaIUJ'
}

const style = { 'layout': 'vertical', 'color': 'silver'};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ spinner, currency, amount, shipping, international, title, description }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
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

function App({ Component, pageProps }) {
  return(
    <PayPalScriptProvider options= {{"client-id": PAYPAL_CLIENT_ID.clientId }}>
      <GoogleSheetsData />
    </PayPalScriptProvider>
  ) 
}

export default App;
