import * as React from "react";
import Cta from "../components/cta";
import { Address } from "@yext/pages/components";
import { FiPhone } from "react-icons/fi";

const Contact = (props: any) => {
  const { address, phone, showCTA } = props;

  return (
    <>
      <div className={`${showCTA ? "" : "addrGrid"}`}>
        <div className="text-lg">
          <div className="font-bold text-2xl">
            Address
          </div>
          <div>{address.line1}</div>
          {address.line2 && <div>{address.line2}</div>}
          <div className="mt-1">
            {address.city}, {address.region} {address.postalCode}
          </div>
          <div className="mt-4 uppercase text-blue-600  hover:cursor-pointer hover:underline underline-offset-8">
            <a>Get Directions</a>
          </div>
          <div className="flex leading-loose items-center mt-4">
            {phone && (
              <span className="">
                <div className="font-bold text-2xl">
                  Phone Number
                </div>


                {phone
                  .replace("+1", "")
                  .replace(/\D+/g, "")
                  .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </span>
            )}
          </div>
        </div>
        {showCTA && (
          <>

            <div className="w-30 mt-4 md:mt-10">
              <Cta
                buttonText="Order Delivery"
                url="#"
                style="secondary-cta"
              ></Cta>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Contact;
