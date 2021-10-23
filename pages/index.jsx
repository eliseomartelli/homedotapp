import Head from "next/head";
import config from "../config.json";
import { Clock } from "../components/Clock.jsx";
import { DarkToggle } from "../components/DarkToggle.jsx";
import { Button } from "../components/Button.jsx";
import { Weather } from "../components/Weather.jsx";
import { Section } from "../components/Section.jsx";

export default function Home() {
  return (
    <div
      className="select-none text-white flex min-h-screen max-w-screen flex-col"
      style={{
        background:
          "linear-gradient(#00000066, #00000066), url('https://9to5mac.com/wp-content/uploads/sites/6/2016/07/red_wallpaper2xipad.png?w=1000')",
      }}
    >
      <Head>
        <title>Homedotapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 w-full flex-grow min-h-screen">
        <div className="flex flex-row mx-1">
          <h1 className="text-4xl font-bold flex-grow mb-6">{config.title}</h1>
          <Weather />
          <Clock />
        </div>
        {config.sections.map((section) => (
          <Section sm={section.small} title={section.title}>
            {section.devices.map((e, i) => (
              <Button key={i} {...e} />
            ))}
          </Section>
        ))}
        <DarkToggle />
      </main>
      <footer className="h-96"></footer>
    </div>
  );
}

