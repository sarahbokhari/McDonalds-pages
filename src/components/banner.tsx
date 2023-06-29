import { Image } from "@yext/pages/components";
import * as React from "react";
import Cta from "./cta";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
  img: any;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: Banner) => {
  const { name, address, children, img } = props;
  console.log(JSON.stringify(img));

  return (
    <>
      <div className="relative h-auto">
        {img && (
          <div
            className="bg-cover bg-center "
            style={{
              backgroundImage: `url("${img[0].image.url}")`,
              height: "250px",
            }}
          ></div>
        )}
        <div className="h-full w-full absolute top-0 left-0 z-2">
          <div className=" w-full absolute bg-black bg-opacity-75 flex items-center justify-center flex-col h-full text-white">
            <div className="text-center space-y-4">
              <div className="text-xl md:text-4xl font-bold">{name}</div>
              <div className=" md:text-2xl">
                {address?.city}, {address?.region}
              </div>
              <div className=" gap-x-8 flex justify-between">
                <Cta
                  buttonText="Get Directions"
                  url="http://google.com"
                  style="primary-cta"
                />
                <Cta
                  buttonText="Order now"
                  url="http://google.com"
                  style="primary-cta"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </>
  );
};

export default Banner;
