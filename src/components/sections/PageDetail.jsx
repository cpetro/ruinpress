import React, { 
  useContext,
  useEffect
} from 'react';

import {
  useParams, 
  Navigate
} from "react-router-dom";

import { DataContext } from '../../contexts/DataContextProvider';

import { ButtonWrapper } from '~/components';

export function PageDetail() {

  const { id } = useParams();

  // console.log(id);

  const context = useContext(DataContext);

  // console.log(context);

  const data = context?.filter((data) => data.id === id);

  // console.log(data);

  const post = [];
  
  useEffect(() => {
    if (!data) return;

    post.title = data[0].title;
    post.subtitle = data[0].subtitle;
    post.price = parseInt(data[0].price);
    post.shipping = parseInt(data[0].shipping);
    post.international = parseInt(data[0].international);
    post.description = data[0].description;
    post.content = data[0].content;
    post.img1 = data[0].img1;
    post.img2 = data[0].img2;
    post.img3 = data[0].img3;
  }, [data]);

  // console.log(post);

  return (
    <h1>{ post.title ? post.title : id }</h1>
    // <div className="w-full bg-white text-accent">
    //   <div className="flex flex-cols-1 flex-col md:flex-row-reverse gap-4 md:gap-8 lg:gap-16 p-4 md:p-8 lg:p-16 max-w-screen-lg mx-auto">
    //     <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-8 relative">
    //       { post.img1.length !== 0 &&
    //         <img className="w-full" alt={ id } src={ post.img1 } />
    //       }
    //       { post.img2.length !== 0 &&
    //         <img className="w-full" alt={ id } src={ post.img2 } />
    //       }
    //       { post.img3.length !== 0 &&
    //         <img className="w-full" alt={ id } src={ post.img3 } />
    //       }
    //     </div>
    //     <div className="flex flex-col w-full md:w-2/3 gap-4 md:gap-8 md:self-start">
    //       { post.title.length !== 0 &&
    //         <h1 className="leading-none">{ post.title }</h1>
    //       }
    //       { post.subtitle.length !== 0 &&
    //         <p>{ post.subtitle }</p>
    //       }
    //       { post.content.length !== 0 &&
    //         <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
    //       }
    //       { post.price > 0 ?
    //         <ButtonWrapper spinner="false" currency="AUD" amount={ post.price } shipping={ post.shipping } international={ post.international} title={ post.title } description={ post.description }/>
    //         :
    //         <p>Sold out!</p>
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}
