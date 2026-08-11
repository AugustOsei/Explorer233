/**
 * Dispatch SE1-01 — "The Grand Opening"
 *
 * Source: "SE1-01 — The Grand Opening — Draft 1" (Drive), last synced from the
 * 2026-08-11 revision. Text is the author's, transcribed in full; scene
 * headings come from the draft's own location/date slugs. Paragraph breaks
 * in the Mars-scene opening (the Fermi Paradox setup) were regrouped from
 * the Drive draft's sentence-per-paragraph export into full paragraphs —
 * a formatting pass, not a content edit; wording is untouched.
 *
 * The title tracks the draft's own header — THE GRAND OPENING. THE GRAND
 * THREAT. It was briefly "The Baobab" here, which named the building rather
 * than the episode and threw away the half of the hook that sells it.
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
 *   · The five scientists threatened at the end — Dr. Samuel Tetteh, Professor
 *     Lindiwe Okafor, Dr. Idris Bello, Dr. Sena Adjei, Dr. Hana El-Masri
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
  title: 'The Grand Opening',
  season: 'Dispatch One',
  setting: 'Mars, 2047 → Accra, 2048',
  status: 'Dispatch One',
  scenes: [
    {
      id: 'mars',
      art: { src: '/images/scene-mars.jpg', alt: 'A signal resolving on the settlement displays' },
      heading: 'Mars International Research Settlement',
      sub: '2047',
      paragraphs: [
        'For most of human history, nobody seriously wondered why the stars weren’t talking to us. The stars were lights in the sky, and humans were generally occupied with the usual business of surviving one another. Then astronomy complicated things.',
        'Humanity discovered that the Sun was only one star among billions in the Milky Way. Later came another discovery: planets were not unusual either. Worlds circled stars almost everywhere we looked, including some where conditions might allow liquid water and, perhaps, life. That left scientists with an awkward question. If there were so many stars, so many planets and so much time for intelligent life to emerge, where was everybody? This became known as the Fermi Paradox.',
        'There were plenty of possible answers. Maybe intelligent life was incredibly rare. Maybe civilizations tended to destroy themselves. Maybe they were simply too far away. One particularly cheerful idea suggested that advanced civilizations deliberately kept quiet because announcing your location in a universe full of strangers might be a spectacularly bad survival strategy. Nobody knew, so humanity did what humanity often does when confronted with a mystery: it built increasingly expensive machines.',
        'For more than a century, SETI programs searched the sky for signs of technology beyond Earth. There were promising signals along the way, but none survived investigation. By the time humans established permanent settlements beyond Earth, the search had expanded with them. Observatories on Earth, the Moon and Mars listened across wavelengths earlier astronomers could only dream of monitoring.',
        'Mars became particularly useful. Far from Earth’s growing electromagnetic noise, its deep-space arrays could listen to parts of the sky with extraordinary sensitivity. Most nights, their analysts found nothing.',
        'Until now.',
        'Dr. Amara Nkrumah had been staring at mostly uninteresting data for nearly four hours when she decided she wanted tea.',
        'Outside the communications room’s reinforced glass, Mars pressed against the settlement in shades of rust and black. A thin storm moved over the northern ridge, dragging loose dust across the floodlights and tapping it against the habitat shell like dry rain.',
        'Amara removed her headset and stretched until the bones in her shoulders clicked. On the largest wall display, Earth hung as a delayed blue image beside a map of relay traffic moving between Mars, the lunar stations, orbital platforms and ships scattered through the inner Solar System.',
        'Nothing about living on another planet felt particularly miraculous at four in the morning. Cargo schedules were late. A drilling unit had lost a wheel. The European greenhouse team was arguing with the East African nutrition unit over water allocation, and someone in Habitat Three had once again used too much bandwidth to stream a football match from Earth. Mars had become a place where people complained about work, which Amara considered one of humanity’s greatest achievements.',
        'She rose from her station and crossed toward the dispenser. Behind her, Arun Dev, the youngest analyst on the night shift, was asleep with his chin resting against his chest. Commander Keiko Tanaka stood near the operations table, reading a report without moving anything except her eyes. João Pereira, systems engineer, was under a console with both legs sticking into the aisle.',
        'The settlement belonged to no country. Flags from twenty-two nations were displayed in the main atrium, but none hung above the others. Its people had arrived through different agencies, companies and coalitions, then learned to depend on one another for air.',
        'Amara’s tea had just begun to pour when Array Four chimed. She glanced back at her station. It was a small sound, almost polite, but when it came again she left the cup beneath the dispenser and returned to the console.',
        'A narrow pulse had appeared on the screen. It was too clean to be background radiation and too evenly spaced to be weather interference.',
        '“Arun.” He woke sharply. “I’m awake.”',
        '“You are now.”',
        '“Relay reflection?” he asked, leaning toward the display.',
        '“Checking.” Amara isolated the pattern. The pulse repeated at eleven-second intervals.',
        'João slid out from beneath the console. “Did we lose a beacon?”',
        '“No registered beacon uses this interval.”',
        'Commander Tanaka approached. “Source?”',
        'Amara widened the field, then narrowed it again. The software tried to assign the signal to a known object and failed. A second array caught the same pulse. Then a third.',
        'The room became very still. “Could be one of the survey craft beyond Jupiter,” João said.',
        '“No.” Amara rotated the projection. The signal vector extended beyond the mapped traffic lanes, beyond the known probes, beyond the edge of the Solar System.',
        'Arun leaned closer. “That calculation is wrong.”',
        'Amara ran it again. The answer did not change. A soft mechanical voice announced that Array Seven had confirmed acquisition.',
        'Commander Tanaka looked at her. “Say it clearly.”',
        'Amara’s mouth had gone dry. “The signal is not originating inside the Solar System.”',
        'Nobody moved. Humanity had spent more than a century building instruments for precisely this possibility, but for several seconds four people on Mars could think of nothing useful to say.',
        'Then the pulse changed.',
        'The repeated tone broke into a sequence. The station systems searched for mathematical structures, navigational code, machine protocols and known linguistic patterns. For three seconds, nothing appeared. Then a line of text formed on the main display.',
        'WE ARE HERE.',
        'Arun whispered something in Hindi while João crossed himself.',
        'Amara stared at the words. Her reflection floated faintly over them: a Ghanaian woman standing on Mars, watching one of humanity’s oldest questions acquire an answer.',
        '“Forward it to Earth?” she asked.',
        'Commander Tanaka did not hesitate. “Priority Alpha. Every partner government. Every deep-space network. Full verification package.”',
        'Amara reached for the transmission control. Array Two chimed.',
        'Another pulse appeared. Tanaka looked toward the display. “Secondary detection?”',
        'Amara checked the coordinates and frowned. “No. Different source.”',
        'Arun was already comparing the vectors. “That can’t be right.”',
        'The second signal was coming from a different star, in a different region of the sky. Array Five rotated toward it and confirmed the pulse. Seconds later, the sequence resolved.',
        'WE ARE HERE.',
        'Nobody spoke.',
        'Array Nine chimed. A third source. Then Array Three found a fourth.',
        'Points of light began appearing across the projection of nearby space. Five sources became seven, then nine. Each came from beyond the Solar System. Each carried the same sequence.',
        '“Could one transmission be reflecting somehow?” Arun asked.',
        '“Across different stellar coordinates?” Amara said. “No.”',
        'The software expanded the map as more detections arrived. The display no longer looked like a diagram of empty space. It looked like a city waking at night.',
        'Commander Tanaka stared at the growing map. “How many?”',
        'Amara looked at the counter but did not answer. The number was still climbing.',
        'For more than a century, the Fermi Paradox had asked one question: where was everybody?',
        'Humanity had its answer.',
        'Now it had a new question.',
        'Why was everybody saying the same thing?',
        'WE ARE HERE.',
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
        '“You moved it,” he said.',
        'Mam looked up from the transparent display hovering over her desk. “I have more important things to do.”',
        'On the screen, a simulation of two gravitational bodies repeatedly collapsed into each other because she had entered one decimal incorrectly. Beside it, three messages from her mother flashed in sequence.',
        'GET DRESSED.',
        'WE LEAVE IN FORTY MINUTES.',
        'DO NOT WEAR THAT OLD JACKET.',
        'Kojo pointed beneath the bed. “Is that my shoe?”',
        'Mam glanced down. “The aliens have returned it.”',
        'He retrieved it and left without thanking either her or the aliens.',
        'From the kitchen came the smell of fried eggs, toasted bread and pepper sauce. The morning news played from the wall display. Every channel carried footage of the Baobab: a new complex of pale concrete, warm wood and shaded glass rising on the eastern edge of Accra. Crowds had already gathered outside its gates.',
        'Today, Explorer 233 would officially open its headquarters. For months, nobody in Ghana had discussed anything else for more than ten minutes without somehow returning to it. Was it a national triumph, a private vanity project, a research institution, a fleet, or simply a very expensive way for rich people to leave Earth before everyone else? The questions changed depending on the speaker, but everyone had an opinion.',
        'Mam closed her failed simulation and selected a new jacket before her mother could send a fourth warning.',
        'In the kitchen, her father was standing over a plate while reading construction reports through his glasses. Kofi Mensah had spent part of the previous two years supervising contractors at the Baobab, which meant he had answered every family question with some variation of I am not permitted to discuss that.',
        'Her mother, Efua, placed food on the table and immediately began telling everyone to eat faster.',
        'On the news, a commentator stood outside the Baobab beside a vendor selling miniature spacecraft, Explorer badges and black charms advertised as protection from extraterrestrial influence.',
        'Kojo pointed at the charms. “Can I buy one?”',
        '“No,” both parents said.',
        '“What if the signals are dangerous?”',
        'Efua set down a bowl. “Then a plastic necklace will certainly save you.”',
        'The broadcaster turned to a group of protesters behind a security barrier. Some carried signs demanding that money be spent on housing and food instead of starships. Others wore black masks marked with crude white circles and held placards reading RETURN TO DAY ZERO.',
        'Mam watched them for a moment. “They are getting more organized.”',
        'Her father lowered his display. “Most of them are performing for the cameras.”',
        '“And the rest?”',
        '“The rest believe technology is the source of every human problem.”',
        'Kojo filled his mouth with bread. “Technology gave us the signals.”',
        '“Exactly,” Mam said.',
        '“That was not agreement,” Kofi replied.',
        'A new image appeared on the broadcast: Laura Osei Baako arriving at the Baobab before sunrise. White braids framed her face. She wore a plain white shirt beneath a dark jacket, black trousers, glasses and one black glove. Reporters shouted questions as she crossed the entrance plaza without slowing.',
        'The caption beneath her read: LAURA OSEI BAAKO — FOUNDER, EXPLORER 233.',
        'Mam leaned closer despite herself.',
        'At eighteen, she had already read every public paper Laura had written, watched every interview she had given and argued online with strangers who claimed that a computer scientist had no business building an interstellar exploration program.',
        'Laura had founded MellaniumORBIT before she was thirty, sold it for an amount no news channel could agree upon, then returned to Ghana and spent much of that fortune constructing the Baobab.',
        'She was either one of the most important people alive or completely insane. Mam suspected both could be true.',
        '“Eat,” her mother said, and Mam ate.',
      ],
    },
    {
      id: 'the-building',
      art: { src: '/images/baobab-hq.jpg', alt: 'The Baobab rising on the eastern edge of Accra' },
      heading: 'The Baobab',
      paragraphs: [
        'The road to the Baobab had become a festival.',
        'Autonomous buses moved in controlled lines while police drones directed pedestrians away from restricted lanes. Vendors sold grilled corn, cold drinks, commemorative patches and shirts printed with the words WE’RE STAR STUFF EXPLORING THE STARS. Children carried toy spacecraft above their heads. News crews broadcast in English, Twi, French, Hausa, Arabic and languages Mam did not recognize.',
        'Above the crowd, a floating public display replayed the first confirmed transmission from Mars.',
        'WE ARE HERE.',
        'Six months had passed since the first message appeared. In that time, observatories across Earth, Mars and the Moon had confirmed signals from dozens of nearby systems. Some came from stars humanity had studied for centuries; others emerged from places where no suitable planet had been detected. Every signal carried the same three words. Nobody had answered publicly — or at least, no government admitted that it had.',
        'The phenomenon had acquired a name: the Fermi Reversal. For more than a century, the Fermi Paradox had asked why a universe that ought to contain life seemed so silent. Now humanity had the opposite problem. The universe was no longer silent. It was saying the same thing from dozens of different places, and nobody knew why.',
        'Mam’s family joined the line beneath the Baobab’s main facade. The building did not resemble the silver towers used in most space-agency propaganda. Its concrete walls curved around shaded courtyards and young trees. Deep wooden fins filtered the sunlight. The Explorer 233 emblem sat above the entrance, simple and certain.',
        'The structure looked less like a machine than something planted.',
        '“That section nearly delayed us by eight weeks,” her father said, pointing toward the western wing.',
        '“You say that every time we pass it,” Efua replied.',
        '“It remains true.”',
        'Inside, the air was cool and smelled faintly of new wood. Staff guided visitors through exhibition halls displaying robotics, planetary habitats, navigation systems and models of orbital craft. One gallery showed Ghanaian schoolchildren remotely controlling machines in a lunar training yard. Another displayed a wall of names belonging to engineers, scientists, welders, programmers, doctors, pilots, cooks, artists and fabricators who had contributed to the project.',
        'Mam slowed at the wall. Explorer 233 was larger than Laura and larger than the famous faces on the news. Thousands of people had built the institution now opening around her.',
        'A voice behind her said, “People always search for the founder’s name first.”',
        'Mam turned.',
        'Maximus Boateng stood beside the display, wearing a dark blazer over a fitted long-sleeve shirt. He was bald, broad-shouldered and bearded, with an earring, dark glasses and a small cowry pendant at his throat. The Mission Director looked exactly as he did in interviews, except more tired.',
        'Mam realized she had been staring. “I wasn’t searching for her,” she said.',
        '“Good answer.”',
        'His glasses shifted toward her father. “Mr. Mensah.”',
        'Kofi straightened. “Director Boateng.”',
        '“You kept the western wing standing after everyone else tried to redesign it.”',
        '“Somebody had to.”',
        'Maximus smiled, then looked at Mam’s visitor badge. “Menaye Ama.”',
        '“Mam.”',
        '“You study physics.”',
        'Her surprise must have shown.',
        '“Your father mentions you whenever he believes a conversation has become insufficiently difficult,” Maximus said.',
        'Kofi looked pleased with himself. Before Mam could respond, an urgent voice spoke through Maximus’s earpiece and his expression changed almost invisibly.',
        '“I have to go. Enjoy the ceremony.” He moved away quickly.',
        'Mam watched him disappear through a staff entrance.',
        '“What happened?” Kojo asked.',
        '“Maybe aliens stole his shoe,” she said.',
        'But Maximus had not looked amused.',
      ],
    },
    {
      id: 'nipa-nsa',
      art: { src: '/images/nipa-nsa.jpg', alt: 'The Nipa Nsa in the assembly chamber' },
      heading: 'Nipa Nsa',
      paragraphs: [
        'Laura stood beneath the first vessel humanity had built in Africa for travel beyond the Solar System and listened to three different people tell her the ceremony was running perfectly. This was how she knew something was wrong.',
        'The ship occupied the central assembly chamber beyond the public galleries, hidden from the audience by an enormous segmented wall. Its hull curved overhead in dark graphite and pale ceramic, interrupted by docking ports, sensor ridges and the gold line of the Explorer emblem. The craft would never land on a planet. It had been assembled in orbit, tested there, then returned to the Baobab’s elevated cradle in sections for final commissioning and public presentation.',
        'Soon, it would return to space and remain there. Its landing shuttles would descend to worlds, its cargo craft would move equipment, and its scouts would travel ahead while the flagship watched from orbit like a patient animal.',
        'Along its hull, white letters read: EXPLORER 233 — NIPA NSA, EX-233-001.',
        'The name came from an Akan proverb Laura’s grandmother had repeated whenever a task became too large for one person: one hand cannot lift a load. No single nation could lift humanity to the stars, and Laura intended to make sure Africa was not asked merely to watch.',
        'Maximus approached from beneath the forward section.',
        '“You were right,” he said.',
        '“I usually am.”',
        '“That remains statistically unsupported. Security detected an unauthorized transmission handshake in the medical research network. It disappeared before isolation.”',
        '“Data taken?”',
        '“Unknown.”',
        '“System failure?”',
        '“No.”',
        'Laura looked toward the vessel. Technicians moved below it, completing final checks. On the opposite side of the chamber, five senior scientists waited for the procession to begin. They represented propulsion, biology, planetary systems, communications and field medicine — the first scientific leadership team assigned to the Nipa Nsa program.',
        '“Delay the ceremony?” Maximus asked.',
        'Laura considered it for less than a second.',
        '“No. Lock internal systems. Double physical security around the science team. Quietly.”',
        '“You know quiet security is a contradiction.”',
        '“Try harder.”',
        'A stage coordinator signaled that they had ninety seconds.',
        'Maximus lowered his voice. “Laura, this may be nothing.”',
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
        'A projection of Mars appeared above the stage. The settlement glowed on its surface, small against the planet. Then came the original pulse, the spreading signals, and the map of stars that had answered humanity without being asked.',
        'Laura walked onto the stage alone and waited until the applause settled.',
        '“For most of human history,” she said, “the night sky gave us only one answer: silence.”',
        'The stars moved slowly above her.',
        '“We filled that silence with stories. Gods. Monsters. Ancestors. Visitors. We imagined civilizations looking back at us because the alternative — that we were alone — was too large to accept.”',
        'The words WE ARE HERE appeared behind her.',
        '“Six months ago, the silence ended.”',
        'Mam felt the room lean toward the stage.',
        '“Since then, governments have competed for control of the signals. Corporations have competed for patents. Nations have begun designing missions whose findings may never be shared. Some say we should wait until the powerful decide what humanity is permitted to know.”',
        'Laura removed her glasses. “We disagree.” A murmur moved through the hall.',
        '“Explorer 233 was not created so Ghana could own the stars. No country can. It was created because humanity will reach them, and Africa must arrive as a builder — not a passenger.”',
        'The applause came harder this time. Mam’s father stood first, Kojo shouted loudly enough to embarrass the entire family, and Efua wiped at one eye and denied doing so. Laura waited again.',
        '“Today is not the unveiling of one ship. It is the commissioning of an exploration fleet.”',
        'The wall behind her began to separate, and light poured through the opening as the segmented panels withdrew to reveal the vessel suspended in the chamber beyond. For one long moment, nobody made a sound.',
        'The Nipa Nsa was not shaped like the sleek rockets of old science fiction. It was broad through the center, with a reinforced spine, rotating habitat sections and smaller craft locked beneath its hull. It looked built to carry people far from home and keep them alive there.',
        'Then the hall erupted, and Mam forgot to breathe.',
        'Across the vessel’s surface, displays illuminated its name and designation. Other silhouettes appeared above it: future hulls, specialist ships, cargo vessels, survey craft and emergency support platforms. Crew recruitment. Scientific missions. Training programs. Planned routes.',
        'It was a fleet not yet complete, but already imagined.',
        'Maximus joined Laura onstage. Behind them came the scientists, engineers and mission teams. The crowd applauded every person without knowing which names would later become famous and which would be remembered for terrible reasons.',
        'Laura lifted one hand.',
        '“The first destination of the Nipa Nsa will be selected from the signal systems after final review. We will travel to a designated departure zone beyond Earth orbit. There, the vessel will activate the Mellanium Field and enter what our engineers call the Current.”',
        'A dark river of stars formed above the ship as Laura continued. “We will not promise that the journey is safe. We will not pretend we understand what waits at the other end. Exploration has never required certainty. It requires preparation, courage and the humility to know that discovery changes the discoverer.”',
        'Her gaze moved across the hall. “To everyone asking whether Africa is ready for this moment, I offer a different question.” The room quieted.',
        '“If we keep waiting for permission, who will write the future while we wait?”',
        'This time, the applause felt like weather.',
      ],
    },
    {
      id: 'midnight',
      art: { src: '/images/scene-dayzero.jpg', alt: 'The message that opened itself on Laura’s wall' },
      heading: 'Near midnight',
      paragraphs: [
        'The celebration continued into the evening.',
        'Visitors filled the courtyards. Music rose from the plaza. Children queued to enter shuttle simulators while adults argued about the cost of the program beside tables serving jollof, waakye and drinks named after planets.',
        'Mam recorded three versions of a video before keeping the least awkward one.',
        '“Today Explorer 233 officially commissioned the Nipa Nsa, the first vessel in a planned exploration fleet—”',
        'Kojo pushed his face into the frame.',
        '“Aliens, we are coming!”',
        'Mam stopped recording. “You ruined it.”',
        '“I improved it.”',
        'A notification flashed across her glasses. Someone had shared her earlier footage of the unveiling. Thousands of people were already arguing beneath it.',
        'Fraud. Historic. Colonial fantasy. African future. Waste of money. Take me with you.',
        'The future had arrived and immediately become a comment section.',
        'Across the courtyard, Laura stood surrounded by ministers, investors and foreign delegates. She smiled when required, listened when useful and escaped whenever possible. Maximus remained near the science team, scanning the crowd through his dark glasses.',
        'One of the scientists — a soft-spoken biologist named Dr. Samuel Tetteh — left the group after receiving a message. Maximus noticed and followed him with his eyes.',
        'Mam noticed Maximus noticing.',
        'Then her mother called her to a family photograph, and the moment passed.',
        'Near midnight, the Baobab finally became quiet.',
        'Cleaning machines moved through the halls. Security teams completed sweeps of the galleries. The Nipa Nsa rested in darkness behind the transparent chamber wall, lit only by maintenance lamps along its hull.',
        'Laura had left the last of the guests to Maximus and climbed alone to her office, high above the emptying courtyard.',
        'She stood before the wall display, barefoot now, her red shoes abandoned beside the desk behind her. Accra glittered beyond the glass.',
        'It had been running since she walked in, filling the wall with the day’s messages: congratulations from presidents, requests from universities, offers from corporations, threats from anonymous accounts — each one tagged, traced, sourced. One message carried none of that. No sender. No routing history. No path it could have entered by. It simply sat there, unlabeled, among everything that had a name.',
        'Laura called Maximus.',
        'He answered immediately. “I’m two floors below.”',
        '“Come up.”',
        '“What is it?”',
        '“I don’t know yet.”',
        'She reached out and touched the message. It was a video file.',
        'The wall went dark. For several seconds, nothing happened. Then a figure appeared.',
        'The person wore a close black mask. A single white zero stretched from the forehead toward the mouth. Two white circles surrounded the eyes.',
        'No electronic distortion covered the voice. It sounded calm, almost ordinary.',
        '“Laura Osei Baako.”',
        'Laura did not move.',
        '“You opened your Baobab today and invited the world to worship tomorrow.”',
        'The figure tilted its head. “You believe every new machine is progress. You believe distance will save humanity from the consequences of what it has become. You call your invasion exploration.”',
        'A white symbol appeared over the image: a circle drawn in one unbroken line.',
        '“We remember the world before the machines learned our names. Before the sky filled with stations. Before human pride reached for other suns.”',
        'Laura heard the office door open behind her. Maximus entered, saw the screen and stopped as the masked figure continued.',
        '“The return begins now.”',
        'Images flashed across the screen — security photographs of the five senior scientists who had stood onstage beside Laura.',
        'One face appeared after another: Dr. Samuel Tetteh, Professor Lindiwe Okafor, Dr. Idris Bello, Dr. Sena Adjei and Dr. Hana El-Masri. Then the images disappeared.',
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
