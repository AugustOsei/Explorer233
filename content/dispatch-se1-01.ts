/**
 * Dispatch SE1-01 — "The Baobab"
 *
 * Source: "SE1-01 — The Baobab — Draft 1" (Drive, 19 July 2026) — confirmed by
 * August as the canonical draft, superseding the older v0.4 "Baobab
 * Commissioning". Text is the author's, lightly abridged for web reading;
 * scene headings come from the draft's own location/date slugs.
 *
 * Canon details that other pages must match:
 *   · Timeline — Mars contact 2047, Baobab opening 2048 (NOT 2037)
 *   · Laura — white braids, glasses, red shoes, and a single glove. RED is the
 *     default; she changes the colour sometimes, so it is not fixed. (This
 *     dispatch happens to describe a black one — that is her, not an error.)
 *     Founded MellaniumORBIT before Explorer 233.
 *   · Maximus — Mission Director AND second-in-command; both are correct. Bald,
 *     bearded, earring, dark glasses, cowrie pendant on a black cord.
 *   · The ship — Nipa Nsa, EX-233-001. Akan: "one hand cannot lift a load"
 */

/**
 * The next release the site counts down to. This replaces the old
 * coming-soon countdown: the site is live, the story is what keeps arriving.
 *
 * ⚠️ `releasesAt` is a placeholder — set the real SE1-02 date before launch.
 */
export const nextDispatch = {
  code: 'SE1-02',
  title: 'Day Zero',
  releasesAt: '2026-09-07T20:00:00Z',
};

export type Scene = {
  id: string;
  heading?: string;
  sub?: string;
  /** Full-bleed plate that opens the scene. Existing Trailer 01 art, mapped by beat. */
  art?: { src: string; alt: string };
  paragraphs: string[];
};

export type Dispatch = {
  code: string;
  title: string;
  season: string;
  setting: string;
  status: string;
  scenes: Scene[];
};

export const dispatchSE101: Dispatch = {
  code: 'SE1-01',
  title: 'The Baobab',
  season: 'Dispatch One',
  setting: 'Mars, 2047 → Accra, 2048',
  status: 'Draft 1',
  scenes: [
    {
      id: 'mars',
      art: { src: '/images/scene-mars.jpg', alt: 'A signal resolving on the settlement displays' },
      heading: 'Mars International Research Settlement',
      sub: '2047',
      paragraphs: [
        'The first message from another star was discovered because Dr. Amara Nkrumah wanted tea.',
        'The communications room had been quiet for nearly four hours. Outside its reinforced glass, Mars pressed against the settlement in shades of rust and black. A thin storm moved over the northern ridge, dragging loose dust across the floodlights and tapping it against the habitat shell like dry rain.',
        'Nothing about it felt miraculous anymore. Cargo schedules were late. A drilling unit had lost a wheel. Mars had become a place where people complained about work, which Amara considered humanity’s greatest achievement.',
        'The settlement belonged to no country. Flags from twenty-two nations were displayed in the main atrium, but none hung above the others. Its people had arrived through different agencies, companies and coalitions, then learned to depend on one another for air.',
        'Amara’s tea had just begun to pour when Array Four chimed. She stopped. It was a small sound, almost polite, but when the array chimed again she abandoned the tea and turned back toward her station.',
        'A narrow pulse stood on the screen. It was too clean to be background radiation, too evenly spaced to be weather interference. The pulse repeated at eleven-second intervals.',
        '“Relay reflection?” Arun asked.',
        '“No registered beacon uses this interval,” Amara said.',
        'She widened the field, then narrowed it again. The software tried to assign the signal to a known object and failed. A second array caught the same pulse. Then a third.',
        'She rotated the projection. The signal vector extended beyond the mapped traffic lanes, beyond the known probes, beyond the edge of the Solar System.',
        'Commander Tanaka looked at Amara. “Say it clearly.”',
        'Amara’s mouth had gone dry. “The signal is not originating inside the Solar System.”',
        'Nobody moved. Then the pulse changed.',
        'The repeated tone broke into a sequence. The station translation systems searched for language, mathematics, navigational code, machine protocol. For three seconds, nothing appeared. Then a line of text formed on the main display.',
        'WE ARE HERE.',
        'Amara stared at the words. Her reflection floated faintly over them: a Ghanaian woman standing on Mars, watching humanity’s oldest question turn into a message.',
        'She reached for the transmission control, but before she touched it Array Two chimed. A second signal appeared from a different star. Then Array Nine found another, and another.',
        'Across the wall, points of light began appearing one after the other, until the map of nearby space looked less like a sky and more like a city waking at night. Each source carried the same message.',
      ],
    },
    {
      id: 'accra',
      art: { src: '/images/scene-accra.jpg', alt: 'Accra on the morning of the commissioning' },
      heading: 'Six months later — Accra, Ghana',
      sub: '2048',
      paragraphs: [
        'Menaye Ama Mensah woke to her brother shouting that aliens had stolen his left shoe.',
        '“They took only one?” she called from her room.',
        '“They want me to look foolish.”',
        '“They travelled between stars to embarrass you before breakfast?”',
        'Kojo appeared in her doorway wearing one sock and an Explorer 233 T-shirt that was already too small for him. At twelve, he had reached the age where every inconvenience was evidence of conspiracy.',
        'On her screen, a simulation of two gravitational bodies repeatedly collapsed into each other because she had entered one decimal incorrectly.',
        'From the kitchen came the smell of fried eggs, toasted bread and pepper sauce. Every channel carried footage of the Baobab: a new complex of pale concrete, warm wood and shaded glass rising on the eastern edge of Accra. Crowds had already gathered outside its gates.',
        'Today, Explorer 233 would officially open its headquarters. For months, nobody in Ghana had discussed anything else for more than ten minutes without somehow returning to it. Was it a national triumph, a private vanity project, a research institution, a fleet, or simply a very expensive way for rich people to leave Earth before everyone else?',
        'On the news, a commentator stood outside the Baobab beside a vendor selling miniature spacecraft, Explorer badges and black charms advertised as protection from extraterrestrial influence.',
        'The broadcaster turned to a group of protesters behind a security barrier. Some carried signs demanding that money be spent on housing and food instead of starships. Others wore black masks marked with crude white circles.',
        'Mam watched them for a moment. “They are getting more organized.”',
        'Her father lowered his display. “Most of them are performing for the cameras.”',
        '“And the rest?”',
        '“The rest believe technology is the source of every human problem.”',
        'A new image appeared on the broadcast: Laura Osei Baako arriving at the Baobab before sunrise. White braids framed her face. She wore a plain white shirt beneath a dark jacket, black trousers, glasses and one black glove. Reporters shouted questions as she crossed the entrance plaza without slowing.',
        'At eighteen, Mam had already read every public paper Laura had written, watched every interview she had given and argued online with strangers who claimed that a computer scientist had no business building an interstellar exploration program.',
        'Laura had founded MellaniumORBIT before she was thirty, sold it for an amount no news channel could agree upon, then returned to Ghana and spent much of that fortune constructing the Baobab.',
        'She was either one of the most important people alive or completely insane. Mam suspected both could be true.',
      ],
    },
    {
      id: 'the-building',
      art: { src: '/images/baobab-hq.jpg', alt: 'The Baobab rising on the eastern edge of Accra' },
      heading: 'The Baobab',
      paragraphs: [
        'The road to the Baobab had become a festival.',
        'Vendors sold grilled corn, cold drinks, commemorative patches and shirts printed with the words WE’RE STAR STUFF EXPLORING THE STARS. Children carried toy spacecraft above their heads. News crews broadcast in English, Twi, French, Hausa, Arabic and languages Mam did not recognize.',
        'Six months had passed since the message appeared. In that time, observatories across Earth, Mars and the Moon had confirmed signals from dozens of nearby systems. Every signal carried the same three words. Nobody had answered publicly — or at least, no government admitted that it had.',
        'The building did not resemble the silver towers used in most space-agency propaganda. Its concrete walls curved around shaded courtyards and young trees. Deep wooden fins filtered the sunlight. The Explorer 233 emblem sat above the entrance, simple and certain. The structure looked less like a machine than something planted.',
        'Inside, the air was cool and smelled faintly of new wood. One gallery showed Ghanaian schoolchildren remotely controlling machines in a lunar training yard. Another displayed a wall of names belonging to engineers, scientists, welders, programmers, doctors, pilots, cooks, artists and fabricators who had contributed to the project.',
        'Mam slowed at the wall. Explorer 233 was larger than Laura and larger than the famous faces on the news. Thousands of people had built the institution now opening around her.',
        'A voice behind her said, “People always search for the founder’s name first.”',
        'Maximus Boateng stood beside the display, wearing a dark blazer over a fitted long-sleeve shirt. He was bald, broad-shouldered and bearded, with an earring, dark glasses and a small cowry pendant at his throat. The Mission Director looked exactly as he did in interviews, except more tired.',
        '“I wasn’t searching for her,” she said.',
        '“Good answer.”',
        'Before Mam could respond, an urgent voice spoke through Maximus’s earpiece and his expression changed almost invisibly.',
        '“I have to go. Enjoy the ceremony.” He moved away quickly.',
      ],
    },
    {
      id: 'nipa-nsa',
      art: { src: '/images/nipa-nsa.jpg', alt: 'The Nipa Nsa in the assembly chamber' },
      heading: 'Nipa Nsa',
      paragraphs: [
        'Laura stood beneath the first vessel humanity had built in Africa for travel beyond the Solar System and listened to three different people tell her the ceremony was running perfectly. This was how she knew something was wrong.',
        'Its hull curved overhead in dark graphite and pale ceramic, interrupted by docking ports, sensor ridges and the gold line of the Explorer emblem. The craft would never land on a planet. Along its hull, white letters read: EXPLORER 233 — NIPA NSA, EX-233-001.',
        'The name came from an Akan proverb Laura’s grandmother had repeated whenever a task became too large for one person: one hand cannot lift a load. No single nation could lift humanity to the stars, and Laura intended to make sure Africa was not asked merely to watch.',
        'Maximus approached from beneath the forward section. “You were right,” he said.',
        '“I usually am.”',
        '“That remains statistically unsupported. Security detected an unauthorized transmission handshake in the medical research network. It disappeared before isolation.”',
        '“Data taken?”',
        '“Unknown.”',
        '“Delay the ceremony?” Maximus asked.',
        'Laura considered it for less than a second. “No. Lock internal systems. Double physical security around the science team. Quietly.”',
        '“You know quiet security is a contradiction.”',
        '“Try harder.”',
        '“Laura, this may be nothing.”',
        '“It may.”',
        '“You do not believe that.”',
        '“No.”',
        'Beyond the segmented wall, the audience began counting down.',
      ],
    },
    {
      id: 'ceremony',
      art: { src: '/images/scene-laura-maximus.jpg', alt: 'Laura and Maximus at the commissioning' },
      heading: 'The commissioning',
      paragraphs: [
        'Mam had expected a speech. Instead, the lights inside the main hall faded until the ceiling became a field of stars, and the crowd fell silent.',
        'Laura walked onto the stage alone and waited until the applause settled.',
        '“For most of human history,” she said, “the night sky gave us only one answer: silence.”',
        '“We filled that silence with stories. Gods. Monsters. Ancestors. Visitors. We imagined civilizations looking back at us because the alternative — that we were alone — was too large to accept.”',
        'The words WE ARE HERE appeared behind her.',
        '“Six months ago, the silence ended.”',
        '“Since then, governments have competed for control of the signals. Corporations have competed for patents. Some say we should wait until the powerful decide what humanity is permitted to know.”',
        'Laura removed her glasses. “We disagree.”',
        '“Explorer 233 was not created so Ghana could own the stars. No country can. It was created because humanity will reach them, and Africa must arrive as a builder — not a passenger.”',
        '“Today is not the unveiling of one ship. It is the commissioning of an exploration fleet.”',
        'The wall behind her began to separate, and light poured through the opening as the segmented panels withdrew to reveal the vessel suspended in the chamber beyond. For one long moment, nobody made a sound.',
        'The Nipa Nsa was not shaped like the sleek rockets of old science fiction. It was broad through the center, with a reinforced spine, rotating habitat sections and smaller craft locked beneath its hull. It looked built to carry people far from home and keep them alive there.',
        'Then the hall erupted, and Mam forgot to breathe.',
        '“The first destination of the Nipa Nsa will be selected from the signal systems after final review. There, the vessel will activate the Mellanium Field and enter what our engineers call the Current.”',
        '“We will not promise that the journey is safe. We will not pretend we understand what waits at the other end. Exploration has never required certainty. It requires preparation, courage and the humility to know that discovery changes the discoverer.”',
        '“To everyone asking whether Africa is ready for this moment, I offer a different question.” The room quieted. “If we keep waiting for permission, who will write the future while we wait?”',
        'This time, the applause felt like weather.',
      ],
    },
    {
      id: 'midnight',
      art: { src: '/images/scene-dayzero.jpg', alt: 'The message that opened itself on Laura’s wall' },
      heading: 'Near midnight',
      paragraphs: [
        'The celebration continued into the evening. Music rose from the plaza. Children queued to enter shuttle simulators while adults argued about the cost of the program beside tables serving jollof, waakye and drinks named after planets.',
        'A notification flashed across Mam’s glasses. Someone had shared her footage of the unveiling. Thousands of people were already arguing beneath it. Fraud. Historic. Colonial fantasy. African future. Waste of money. Take me with you.',
        'The future had arrived and immediately become a comment section.',
        'Near midnight, the Baobab finally became quiet. The Nipa Nsa rested in darkness behind the transparent chamber wall, lit only by maintenance lamps along its hull.',
        'Laura stood alone in her office, barefoot now, her red shoes abandoned beside the desk. Accra glittered beyond the glass.',
        'The day’s messages covered one wall: congratulations from presidents, requests from universities, offers from corporations and threats from anonymous accounts. One file sat apart from the rest. It had no sender, no routing history and no detectable entry point.',
        'She opened the file. The screen went black. For several seconds, nothing happened. Then a figure appeared.',
        'The person wore a close black mask. A single white zero stretched from the forehead toward the mouth. Two white circles surrounded the eyes. Behind the figure stood others wearing the same face.',
        '“Laura Osei Baako. You opened your Baobab today and invited the world to worship tomorrow.”',
        '“You believe every new machine is progress. You believe distance will save humanity from the consequences of what it has become. You call your invasion exploration.”',
        '“We remember the world before the machines learned our names. Before the sky filled with stations. Before human pride reached for other suns.”',
        'Laura heard the office door open behind her. Maximus entered, saw the screen and stopped as the masked figure continued.',
        '“The return begins now.”',
        'Images flashed across the screen — security photographs of the five senior scientists who had stood onstage beside Laura. One face appeared after another. Then the images disappeared.',
        '“Within twenty-four hours,” the figure said, “one of your scientists will die.”',
        'The video ended. For a moment, Laura and Maximus stood in the reflection of the black screen. Then Laura put her shoes back on.',
        '“Seal the building,” she said.',
        'Maximus was already speaking into his earpiece.',
        'Far below them, beneath the sleeping Baobab, the Nipa Nsa waited to be returned to the sky.',
        'And somewhere in Accra, a man who had never met Laura Osei Baako was preparing to kill for Day Zero.',
      ],
    },
  ],
};
