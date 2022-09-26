import React, { useContext } from 'react';

import { useParams, Navigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContextProvider';

import { 
  ButtonWrapper,
  Image
} from '~/components';

export function PageDetail() {

  const { id } = useParams();

  const context = useContext(DataContext);

  // console.log(context);

  const index = context?.findIndex(element => {
    if (element.id === id ) {
      return true;
    }

    return false;
  });

  const title = context?.[index]?.title;
  const subtitle = context?.[index]?.subtitle;
  const price = parseInt(context?.[index]?.price);
  const shipping = parseInt(context?.[index]?.shipping);
  const international = parseInt(context?.[index]?.international);
  const description = context?.[index]?.description;
  const content = context?.[index]?.content;
  const img1 = context?.[index]?.img1;
  const img2 = context?.[index]?.img2;
  const img3 = context?.[index]?.img3;

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
