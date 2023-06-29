import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Markdown } from "react-showdown";
import Contact from "./contact";
import HoursText from "./HoursText";
import Cta from "./cta";
const LocCarousel = (props: any) => {
  const { data } = props;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => (
          <div key={index} className="p-4 w-full">
            <div className="textClass leading-6 font-normal">
              <h1 className="text-xl font-bold float-left">{item.name}</h1>
              <div className="-ml-1 locCar mb-1">
                <HoursText document={props.document} />
              </div>
              <div>
                <Contact
                  address={item.address}
                  //phone={item.mainPhone}
                  showCTA={false}
                ></Contact>
              </div>
              <div className="mb-8 text-black text-left">
                {item.mainPhone &&
                  item.mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
              <div className="mt-4 uppercase text-black text-left">
                {/* View page */}
                <Cta
                  buttonText="View Page"
                  url={`/${item.slug}`}
                  style="primary-cta"
                />
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default LocCarousel;
