import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = () => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey: "locations",
  });
  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {

    const { query } = searchEventData;

    if (query)
      window.open(
        "https://hiply-special-turtle.pgsdemo.com/?query=" + query,
        "_blank"
      );
  };
  const [queryPrompts, setQueryPrompts] = useState<string[]>([]);
  const words = ["CSS3.", "HTML5.", "javascript."];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = queryPrompts[i].split("");
    var loopTyping = function () {
      if (word.length > 0) {
        let ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder += word.shift();
      } else {
        deletingEffect();
        return false;
      }
      timer = setTimeout(loopTyping, 65);
    };
    loopTyping();
  }

  function deletingEffect() {
    let word = queryPrompts[i].split("");
    var loopDeleting = function () {
      if (word.length > 0) {
        word.pop();
        let ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder = word.join("");
      } else {
        if (words.length > i + 1) {
          i++;
        } else {
          i = 0;
        }
        typingEffect();
        return false;
      }
      timer = setTimeout(loopDeleting, 35);
    };
    loopDeleting();
  }

  const fetchUnivPrompts = async () => {
    const apiKey = "19fa2065ce6d67640abdd46279ced871";
    const experienceKey = "answers";
    const experienceVersion = "PRODUCTION";
    const businessId = "3919000";
    const locale = "en";
    var url =
      "https://liveapi.yext.com/v2/accounts/me/answers/autocomplete";
    url += "?v=20190101";
    url += "&api_key=" + apiKey;
    url += "&sessionTrackingEnabled=false";
    url += "&experienceKey=" + experienceKey;
    url += "&input=";
    url += "&version=" + experienceVersion;
    url += "&locale=" + locale;
    try {
      let res = await fetch(url);
      let body = await res.json();
      let qs = body.response.results.map((item: any) => {
        return item.value;
      });
      setQueryPrompts(qs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUnivPrompts();
  }, []);

  useEffect(() => {
    queryPrompts.length >= 1 && typingEffect();
  }, [queryPrompts]);

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="w-full">
          <nav className="">
            <img
              loading="lazy"
              src="https://i.imgur.com/AQaTORA.png"
              className="hidden md:block"
            ></img>
            <img
              loading="lazy"
              src="https://i.imgur.com/wMLbcJg.png"
              className="block md:hidden"
            ></img>
          </nav>
        </div>

        <div className="w-full">
          <SearchBar
            onSearch={onSearch}
            customCssClasses={{
              searchBarContainer:
                "w-full px-4 md:px-0 md:w-3/6 mt-4 mx-auto mb-auto ",
              inputElement: "demo ",
            }}
            hideRecentSearches={true}
          />
        </div>
      </SearchHeadlessProvider>
    </>
  );
};

export default Header;
