/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import StaticMap from "../components/static-map";
import "../index.css";
import { FiClock, FiPhone } from "react-icons/fi";
import Carousel from "../components/Carousel";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Header from "../components/header";
import Footer from "../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HoursText from "../components/HoursText";
import { BsArrowRightCircle, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import LocCarousel from "../components/LocCarousel";
import Schema from "../components/Schema";
import RTF from "../components/RTF";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "c_disc",
      "hours",
      "slug",
      // "c_bannerImg",
      "geocodedCoordinate",
      "services",
      "c_relatedMenuItems.name",
      "c_relatedMenuItems.c_photo",
      "c_relatedMenuItems.c_calories",
      "c_relatedFAQs.question",
      "c_relatedFAQs.answer",
      // "c_nearByLocations.name",
      // "c_nearByLocations.address",
      // "c_nearByLocations.hours",
      // "c_nearByLocations.mainPhone",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.line1
    }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 **/
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name, // Page Title
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta", // Meta Tag (Description)
        attributes: {
          name: "description",
          description: "This site was generated by the Yext SSG",
        },
      },
      {
        type: "meta", // Meta Tag (og:image)
        attributes: {
          name: "og:image",
          description: "https://images.google.com/",
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    c_relatedMenuItems,
    c_relatedFAQs, c_disc
    // c_nearByLocations,
    // c_bannerImg,
  } = document;
  const [isActive, setIsActive] = useState(false);

  let services = ["Mobile Deals", "Mobile Ordering", "Drive Thru Coffee", "Gift Cards", "Drive Thru", "McDelivery", "Wi-Fi"];
  return (
    <>
      {/* <Schema document={cpy}></Schema> */}
      <Header />
      <Banner
        name={name}
        address={address}
        img={"https://lh3.googleusercontent.com/p/AF1QipO2rmH8pFgmiDcB3RvCa-Zo-XL1WYN6Mheeiys-=s1360-w1360-h1020"}
        openTime={openTime}
      ></Banner>
      <div className="centered-container">
        <div className="section">

          <div className="grid grid-cols-1 md:grid-cols-3 mx-auto">
            <div>
              <div className="text-center   mx-auto">  <h1 className="text-4xl mb-4 font-bold text-black uppercase text-center">
                {name}
              </h1>
                <Contact
                  address={address}
                  phone={mainPhone}
                  showCTA={true}
                ></Contact>
              </div>

            </div>
            <div>
              <div className="pt-5 mt-4 md:mt-0 mx-auto">

                <div className="flex flex-col mt-4 text-base md:text-xl justify-center md:justify-left gap-y-4">
                  <div className="flex gap-4 items-center">
                    <div><BsArrowRightCircle /></div>
                    <div className="text-2xl font-bold">Services</div>
                  </div>
                  {/* <span className="font-bold ">Services:</span> */}

                  <div className=" ml-2 grid grid-cols-2 services gap-4">
                    {services.map((item) => (
                      <div>{item}</div>
                    ))}
                  </div>
                </div>

                {hours && (
                  <div className="flex w-full leading-loose items-baseline text-base md:text-xl">
                    <FiClock />
                    <span className="ml-2">
                      <HoursText document={document} />
                    </span>
                    {!isActive && (
                      <BsChevronDown
                        className="ml-4"
                        onClick={(e) => setIsActive(!isActive)}
                      />
                    )}
                    {isActive && (
                      <BsChevronUp
                        className="ml-4"
                        onClick={(e) => setIsActive(!isActive)}
                      />
                    )}
                  </div>
                )}
                {isActive && hours && <Hours title={""} hours={hours} />}
              </div></div>
            <div className="mt-8"> {geocodedCoordinate && (
              <StaticMap
                latitude={geocodedCoordinate.latitude}
                longitude={geocodedCoordinate.longitude}
              ></StaticMap>
            )}</div>

          </div>
        </div>
      </div>
      <div className="mx-auto p-4 mb-4 mx-auto text-center">
        <h1 className="text-4xl mb-4 font-bold text-black uppercase">
          Featured Menu
        </h1>
        {c_relatedMenuItems && <Carousel data={c_relatedMenuItems}></Carousel>}
      </div>
      <div className="my-8 mb-20 md:mb-8 mx-4">
        <div className="w-full  md:w-3/4 mx-auto">
          <h1 className="text-4xl font-bold text-black uppercase text-center mb-4">
            Limited Time Offers
          </h1>
          <div
            className="flex flex-col md:flex-row w-full justify-evenly gap-1 md:gap-3"
            style={{ height: "300px" }}
          >
            <div
              className="w-full md:w-1/2"
              style={{
                backgroundImage:
                  "url(https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_GrimaceBirthday.jpg)",
                backgroundSize: "cover",
              }}
            >
              <div
                className="w-2/3 h-2/3 border my-auto p-4"
                style={{
                  marginTop: "5%",
                  marginLeft: "5%",
                  background: "black",

                  color: "white",
                }}
              >
                <h1 className="text-base md:text-xl font-bold">
                  Grimace's B-day Is Best B-day
                </h1>
                <p className="pb-4  md:my-4">
                  HBD, purple pal. Get Grimace's Birthday Shake exclusively with Grimace's Birthday Meal—including ur choice of Big Mac® or 10 piece McNuggets® and Fries.
                </p>
                <Cta buttonText="Get His B-day Meal" style="primary-cta " url={""}></Cta>
              </div>
            </div>
            <div
              className="w-full md:w-1/2"
              style={{
                backgroundImage:
                  "url(https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1pub_FreeLargeFries_2336x1040.jpg)",
                backgroundSize: "cover",
              }}
            >
              <div
                className="w-2/3 h-2/3 border my-auto p-4"
                style={{
                  marginTop: "1%",
                  marginLeft: "5%",
                  background: "black",

                  color: "white",
                }}
              >
                <h1 className="text-base md:text-xl font-bold">
                  Free Large Fries Now.
                </h1>
                <p className="pb-4 md:my-4">
                  When you join MyMcDonald’s Rewards, you start earning points on every eligible order—points you can put towards more free food.
                </p>
                <Cta buttonText="Get Free Fries in the App" style="primary-cta " url={""}></Cta>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-full bg-gray-200 mt-4">
        <div className="p-4 w-full md:w-2/4 mx-auto text-center mb-10 ">
          <h1 className="text-2xl font-bold border-b border-black mb-4 pb-4">
            FAQs
          </h1>
          <div className="bg-grey-100 mt-10">
            {c_relatedFAQs && (
              <Accordion allowZeroExpanded>
                {c_relatedFAQs.map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    className="faqAccordion my-4 py-4 border-b  border-black text-left"
                  >
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="font-bold">{item.question}</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel> <RTF>{item.answer}</RTF></AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-3/4 mx-auto flex p-4 justify-evenly flex-col gap-4 md:gap-0 md:flex-row"
        style={{ background: "white" }}
      >
        <div className="my-auto w-full md:w-1/2 ">
          <h1 className="text-5xl font-bold text-black uppercase ">
            Deliciousness at your fingertips
          </h1>
          <div className="mt-4 text-base md:text-xl">
            Order now with the Mobile Order & Pay app on iOS or Android, and pick it up at the store
          </div>
          <div className="flex w-3/4 md:w-full mx-auto mt-4 md:mt-8 gap-1 md:gap-4 justify-start md:justify-none">
            <img
              loading="lazy"
              src="https://www.mcdonalds.com/content/dam/sites/usa/nfl/images/iphone.jpg"
              alt=""
              className="h-8"
            />
            <img
              loading="lazy"
              src="https://www.mcdonalds.com/content/dam/sites/usa/nfl/images/Android.jpg"
              alt=""
              className="h-8"
            />
          </div>
        </div>
        <div>
          <img
            loading="lazy"
            className="max-w-full	w-full"
            src="https://www.mcdonalds.com/content/dam/sites/usa/nfl/images/AppPromo_DownloadApp_475x360.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="my-8 hidden md:block ">
        <div className="pt-5">

          <div className="w-4/6 mx-auto text-center mt-10  bg-white">
            <div className=" font-bold uppercase text-black text-5xl">
              About {name}
            </div>
            <div className="flex gap-4 mt-8">
              <div className="mt-4 text-left text-gray-500 leading-8 w-1/2">
                <RTF>{c_disc}</RTF>
              </div>
              <div className=" w-1/2">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipO2rmH8pFgmiDcB3RvCa-Zo-XL1WYN6Mheeiys-=s1360-w1360-h1020"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto p-4 mb-4 mx-auto text-center">
        <h1 className="text-4xl mb-4 font-bold text-black uppercase">
          Near by locations
        </h1>
        {/* {c_nearByLocations && (
          <LocCarousel data={c_nearByLocations} document={document} />
        )} */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Location;