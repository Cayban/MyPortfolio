import { useEffect, useState } from "react";
import { Page, Arrow } from "./shared";
import "./realm-keeper.css";

const features = [
  { name: "Profit planner", title: "Plan before you plant.", text: "Compare a farming project's costs and estimated returns before committing your seeds. Keep Shard and Token decisions in one place.", image: 2 },
  { name: "Goal preview", title: "See where the plan leads.", text: "Review the estimated ending Shard balance and whether your chosen sales can reach your goal. Estimates depend on the values you enter.", image: 3 },
  { name: "Timers", title: "Keep your farming day in view.", text: "Track crops, animals, and processing tasks with timers, so the next harvest is easier to keep up with.", image: 1 },
  { name: "Daz-l", title: "A little help with the numbers.", text: "Daz-l explains the active Profit Plan using its own numbers, making costs, returns, and balances easier to understand.", image: 4 },
  { name: "Community", title: "Find help in your realm.", text: "Discover player services and view their details, availability, and reviews in the companion app.", image: 5 },
];

export default function RealmKeeperDetail({ theme }) {
  const [active, setActive] = useState(0);
  const feature = features[active];
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <Page theme={theme}>
    <article className="rk-page">
      <div className="rk-intro">
        <div>
          <h1>Realm Keeper</h1>
          <p className="rk-lead">A calmer way to plan your next harvest.</p>
          <p className="rk-summary">My unofficial Crystal Realms companion, built under KLEI Labs. Bring farming plans, timers, market prices, and your realms into one place.</p>
          <a className="rk-launch" href="https://titoayban.itch.io/realm-keeper" target="_blank" rel="noreferrer">Open Realm Keeper <Arrow /></a>
          <dl className="rk-meta"><div><dt>Project</dt><dd>Personal · KLEI Labs</dd></div><div><dt>Available on</dt><dd>Browser & Android</dd></div><div><dt>Access</dt><dd>Free to use</dd></div></dl>
        </div>
        <figure className="rk-hero-image"><img src="/projects/realm-1.png" alt="Realm Keeper home screen with its forest theme and active timers" /><figcaption>Your farming day, at a glance.</figcaption></figure>
      </div>
      <section className="rk-showcase" aria-labelledby="rk-explore">
        <h2 id="rk-explore">Inside the companion</h2>
        <p className="rk-section-intro">Choose a feature to take a closer look.</p>
        <div className="rk-options" aria-label="Feature previews">{features.map((f, i) => <button key={f.name} type="button" aria-pressed={active === i} aria-controls="rk-feature" onClick={() => setActive(i)}>{f.name}</button>)}</div>
        <div id="rk-feature" className="rk-feature">
          <div className="rk-feature-copy" aria-live="polite"><h3>{feature.title}</h3><p>{feature.text}</p><p className="rk-caption">Screens from Realm Keeper on itch.io.</p></div>
          <figure><img key={feature.image} src={`/projects/realm-${feature.image}.png`} alt={`${feature.name} screen in Realm Keeper`} /></figure>
        </div>
      </section>
      <section className="rk-context"><h2>Built around the farming loop.</h2><div><p>I wanted a place to keep track of farming time, estimate what a project could earn, and decide which products to sell. Realm Keeper brings those decisions together instead of leaving them scattered across notes.</p><p>Alongside planning, the app includes market prices, trade evaluation, an item library, realm organization, and backup tools.</p></div></section>
      <footer className="rk-close"><h2>Take it into your realm.</h2><a className="rk-launch" href="https://titoayban.itch.io/realm-keeper" target="_blank" rel="noreferrer">Try it on itch.io <Arrow /></a><p>Unofficial companion for Crystal Realms. Not affiliated with or endorsed by Cosmic Shark Games.</p></footer>
    </article>
  </Page>;
}
