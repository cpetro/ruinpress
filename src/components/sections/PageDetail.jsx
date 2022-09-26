import React, { useContext } from 'react';

import { useParams, Navigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContextProvider';

import { 
  ButtonWrapper,
  Image
} from '~/components';

export function PageDetail() {

  const { id } = useParams();

  const data = useContext(DataContext);

  // console.log(data);

  const index = data?.findIndex(element => {
    if (element.id === id ) {
      return true;
    }

    return false;
  });

  const title = data?.[index]?.title;
  const subtitle = data?.[index]?.subtitle;
  const price = parseInt(data?.[index]?.price);
  const shipping = parseInt(data?.[index]?.shipping);
  const international = parseInt(data?.[index]?.international);
  const description = data?.[index]?.description;
  const content = data?.[index]?.content;
  const img1 = data?.[index]?.img1;
  const img2 = data?.[index]?.img2;
  const img3 = data?.[index]?.img3;

  return (

    <div className="w-full bg-white text-accent">
      <div className="flex flex-cols-1 flex-col md:flex-row-reverse gap-4 md:gap-8 lg:gap-16 p-4 md:p-8 lg:p-16 max-w-screen-lg mx-auto">
        <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-8 relative">
          { img1 !== '' &&
            <Image alt={ id } src={ img1 } />
          }
          { img2 !== '' &&
            <Image alt={ id } src={ img2 } />
          }
          { img3 !== '' &&
            <Image alt={ id } src={ img3 } />
          }
        </div>
        <div className="flex flex-col w-full md:w-2/3 gap-4 md:gap-8 md:self-start">
          { title !== '' &&
            <h1 className="leading-none">{ title }</h1>
          }
          { subtitle !== '' &&
            <p>{ subtitle }</p>
          }
          { content !== '' &&
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
}
