import Head from "next/head";
import config from "../config.json";
import { Clock } from "../components/Clock.jsx";
import { Button } from "../components/Button.jsx";
import { Weather } from "../components/Weather.jsx";
import { Section } from "../components/Section.jsx";

export default function Home() {
  return (
    <div
      className="select-none text-white overflow-x-hidden w-full block"
      style={{
        background:
          "linear-gradient(#00000066, #00000066), url('https://9to5mac.com/wp-content/uploads/sites/6/2022/07/Home-app-iOS-16-wallpaper-21.png')",
          backgroundSize: 'cover',
      }}
    >
      <Head>
        <title> Homedotapp </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 flex-grow min-h-screen flex flex-col">
        <div className="flex flex-row mx-1">
          <h1 className="text-4xl font-bold flex-grow mb-6" onClick={() => toggleFullscreen()}>
            {config.title}
          </h1>
          <Weather />
          <Clock />
        </div>
        {config.sections.map((section, i) => (
          <Section sm={section.small} title={section.title} key={i}>
            {section.devices.map((e, i) => (
              <Button key={i} {...e} />
            ))}
          </Section>
        ))}
      </main>
    </div>
  );

  function toggleFullscreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
}