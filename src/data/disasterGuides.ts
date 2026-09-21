import { DisasterGuide } from '../types';

export const disasterGuides: DisasterGuide[] = [
  {
    id: 'fire',
    title: 'Fire Emergency',
    icon: '🔥',
    severity: 'extreme',
    summary: 'Structure, kitchen, and wildfire safety protocols. Immediate evacuation and life safety are priority #1.',
    before: [
      'Install smoke alarms on every level of your home and test them monthly.',
      'Keep an ABC-type fire extinguisher in the kitchen and garage; know how to PASS (Pull, Aim, Squeeze, Sweep).',
      'Plan two escape routes out of every room and establish an outside meeting location.',
      'Practice home fire drills twice a year with all household members.',
      'Keep flammable materials away from heaters, stoves, and open flames.'
    ],
    during: [
      'Get out and stay out: never stop to collect personal belongings.',
      'Crawl low under smoke where the air is cleaner and cooler.',
      'Feel closed doors with the back of your hand before opening; if warm, use your secondary exit.',
      'If your clothes catch fire: STOP, DROP to the ground, and ROLL until flames are extinguished.',
      'If trapped: close all doors between you and the fire, seal vents/cracks with cloth, and signal at a window.'
    ],
    after: [
      'Call emergency services (112 or 101) from outside the building.',
      'Do NOT re-enter a burning or damaged structure until fire officials declare it safe.',
      'Seek immediate medical care for burns, smoke inhalation, or difficulty breathing.',
      'Contact insurance and document structural damage with photos once permitted.',
      'Discard food, medicine, and water exposed to heat, smoke, or fire extinguisher chemicals.'
    ],
    warnings: [
      'NEVER use water on grease or electrical fires (smother grease fires with a lid or use baking soda).',
      'NEVER use elevators during a fire evacuation; always use stairwells.',
      'NEVER re-enter a building to save pets or property; notify firefighters immediately.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'Fire Service', number: '101' },
      { label: 'Ambulance', number: '102' }
    ]
  },
  {
    id: 'earthquake',
    title: 'Earthquake',
    icon: '🌎',
    severity: 'extreme',
    summary: 'Rapid seismic shaking protocols. Drop, Cover, and Hold On to protect against collapsing debris and falling objects.',
    before: [
      'Anchor tall furniture, water heaters, bookcases, and heavy appliances securely to wall studs.',
      'Keep heavy or breakable items on lower shelves.',
      'Identify safe spots in every room: under sturdy desks, interior tables, or against interior walls away from glass.',
      'Prepare an emergency grab-and-go kit near your exit door.',
      'Know where and how to shut off home gas, water, and electricity main valves.'
    ],
    during: [
      'DROP onto your hands and knees to prevent being knocked over.',
      'COVER your head and neck under a sturdy table or desk. If no shelter, cover head with arms against an interior wall.',
      'HOLD ON to your shelter until shaking stops. Be prepared to move with it.',
      'If indoors: STAY indoors. Do NOT run outside during shaking where falling glass and masonry are deadly.',
      'If outdoors: move to a clear open area away from buildings, utility poles, trees, and overhead wires.',
      'If driving: safely pull over away from overpasses, bridges, and power lines; stay inside vehicle.'
    ],
    after: [
      'Expect aftershocks; drop, cover, and hold on each time shaking resumes.',
      'Check yourself and others for injuries; apply immediate first aid.',
      'Inspect for gas leaks (smell of gas or hissing sound); shut off gas main if leaking and evacuate immediately.',
      'Never use matches, lighters, or open flames due to potential gas leaks.',
      'Wear sturdy shoes and leather gloves to protect against broken glass and sharp debris.'
    ],
    warnings: [
      'DO NOT stand in doorways; modern doorways are not stronger than walls and offer no protection from flying debris.',
      'DO NOT use elevators during or immediately after an earthquake.',
      'DO NOT enter damaged structures until certified by structural engineers.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'Disaster Helpline (NDMA)', number: '1078' },
      { label: 'Ambulance', number: '108' }
    ]
  },
  {
    id: 'flood',
    title: 'Flood & Flash Flood',
    icon: '🌊',
    severity: 'high',
    summary: 'Rising water and flash flood survival. Moving water possesses immense kinetic energy; never walk or drive through floodwaters.',
    before: [
      'Know your area’s flood risk, elevation, and designated community evacuation routes.',
      'Store valuable documents, electronics, and hazardous chemicals above projected flood levels.',
      'Install check valves in plumbing to prevent floodwater from backing into household drains.',
      'Keep sandbags, plastic sheeting, and waterproof containers ready.',
      'Charge all emergency communication devices and prepare portable battery banks.'
    ],
    during: [
      'Evacuate immediately if advised by local authorities or if rising water threatens your location.',
      'Move to higher ground or upper floors. Do NOT hide in closed attics without rooftop access.',
      'Turn Off main electrical breakers and gas valves before evacuating if safe to do so.',
      'Turn Around, Don’t Drown: just 6 inches (15cm) of moving water can knock an adult down; 12 inches can sweep away a car.',
      'Avoid walking or swimming in floodwaters due to hidden currents, open manholes, and live electrical wires.'
    ],
    after: [
      'Return home only when local authorities officially announce it is safe.',
      'Avoid standing floodwaters: they are often contaminated with raw sewage, industrial chemicals, and venomous snakes.',
      'Do NOT touch electrical equipment if it is wet or if you are standing in water.',
      'Boil municipal or well water vigorously for at least 1 minute before drinking or cooking until tested.',
      'Thoroughly ventilate and disinfect flooded rooms to prevent toxic mold proliferation.'
    ],
    warnings: [
      'NEVER attempt to drive through water-covered bridges or roadways.',
      'NEVER drink tap water in flood zones without official safety clearance or vigorous boiling.',
      'Beware of displaced wildlife (snakes, insects) seeking dry refuge in homes.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'NDMA Flood Control', number: '1078' },
      { label: 'Ambulance', number: '102' }
    ]
  },
  {
    id: 'cyclone',
    title: 'Cyclone & Hurricane',
    icon: '🌀',
    severity: 'extreme',
    summary: 'Violent winds, torrential rains, and destructive storm surges. Secure shelters and heed coastal evacuation orders.',
    before: [
      'Inspect roof tiles, secure loose sheets, and trim tree branches close to power lines and windows.',
      'Install storm shutters or securely board up large exterior windows with plywood.',
      'Store at least 7 days of non-perishable food, potable water, and required prescription medicines.',
      'Identify the nearest cyclone shelter or reinforced government relief center.',
      'Secure outdoor furniture, garbage cans, antennas, and metal signs that can become lethal airborne missiles.'
    ],
    during: [
      'Stay indoors in the strongest, most central room (bathroom, hallway) on the lowest floor away from windows.',
      'Disconnect electrical appliances and turn off LPG gas cylinders at the regulator.',
      'Beware of the "Eye of the Storm": a sudden calm does NOT mean the storm is over; severe opposite winds follow quickly.',
      'Keep emergency battery-powered radio or local alerts active for meteorological updates.',
      'If structure begins to fail, shield your head and chest under heavy mattresses or sturdy furniture.'
    ],
    after: [
      'Remain in your shelter until the meteorological department officially declares the cyclone has passed.',
      'Beware of fallen power lines and dangling electrical cables; assume all downed wires are live.',
      'Watch for flash floods and road washouts in low-lying sectors.',
      'Inspect water lines and food stocks for contamination.',
      'Cooperate with disaster response personnel and clear local emergency paths if able.'
    ],
    warnings: [
      'DO NOT venture outside during the lull of the eye of the cyclone.',
      'DO NOT ignore mandatory coastal evacuation directives.',
      'DO NOT touch or drive over fallen overhead power cables.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'NDMA Cyclone Helpline', number: '1078' },
      { label: 'Coast Guard Emergency', number: '1554' }
    ]
  },
  {
    id: 'severe_weather',
    title: 'Severe Weather & Thunderstorm',
    icon: '⛈️',
    severity: 'high',
    summary: 'Lightning, hail, microbursts, and extreme storm safety. "When Thunder Roars, Go Indoors."',
    before: [
      'Monitor local meteorological radar and severe storm warnings.',
      'Unplug sensitive electronics and appliances to protect against lightning power surges.',
      'Bring pets inside and secure light patio items.',
      'Check emergency lighting (flashlights, emergency lanterns) and check battery levels.',
      'Ensure vehicle fuel tank is adequate in case travel is interrupted.'
    ],
    during: [
      'Seek shelter in a substantial, enclosed building or hard-topped metal vehicle.',
      'Stay away from windows, exterior doors, and metal objects.',
      'Avoid plumbing fixtures, sinks, and corded phones; lightning can travel through plumbing and wiring.',
      'If caught outside in an open area with no shelter: crouch down on the balls of your feet with head tucked (lightning crouch); do NOT lie flat.',
      'Stay clear of isolated tall trees, hilltop ridges, metal fences, and bodies of water.'
    ],
    after: [
      'Wait at least 30 minutes after the last thunderclap before leaving enclosed shelter.',
      'Check property for damaged trees, hanging limbs, and structural roof trauma.',
      'Report downed electrical lines to utility companies or emergency services immediately.',
      'Drive with caution; watch for pooled water, hail accumulation, and disabled traffic signals.',
      'Assist elderly neighbors and pets that may be distressed.'
    ],
    warnings: [
      'DO NOT shelter under isolated tall trees or open gazebos during lightning.',
      'DO NOT take showers, baths, or wash dishes during active lightning storms.',
      'DO NOT touch metal fences, golf clubs, or bicycles during lightning.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'Police Control', number: '100' },
      { label: 'Ambulance', number: '108' }
    ]
  },
  {
    id: 'road_accident',
    title: 'Road Accident & Collision',
    icon: '🚗',
    severity: 'high',
    summary: 'Scene safety, patient stabilization, and emergency notification during vehicular collisions.',
    before: [
      'Always wear seatbelts (driver and all passengers) and helmets on two-wheelers.',
      'Keep a vehicle emergency kit: reflective triangle, first-aid pouch, flashlight, glass breaker tool.',
      'Never drive under the influence of alcohol, medications causing drowsiness, or mobile distractions.',
      'Maintain vehicle brakes, tires, lights, and wipers in optimal condition.',
      'Keep emergency medical info and contact cards in your glove compartment.'
    ],
    during: [
      'Stop immediately and assess personal injuries first before moving.',
      'Turn on vehicle Hazard Lights (four-way flashers) to alert approaching traffic.',
      'If safe to exit, set up reflective warning triangles 50 meters behind the accident scene.',
      'Turn off ignitions of all involved vehicles to reduce fire explosion hazards.',
      'Do NOT move seriously injured victims unless there is immediate danger of fire or explosion.'
    ],
    after: [
      'Call National Emergency 112 or Highway Emergency 1033 / 1073 immediately.',
      'Provide exact location: highway milestone, landmark, GPS coordinates, and number of injured.',
      'Check injured persons for responsiveness and breathing; control severe bleeding with direct pressure.',
      'Keep victims warm and calm; reassure them that emergency medical teams are on the way.',
      'Take photos of vehicle positions, road conditions, and license plates for insurance and legal records.'
    ],
    warnings: [
      'DO NOT remove motorcycle helmets from injured riders unless airway is compromised (spinal injury risk).',
      'DO NOT move patients with potential neck or spine trauma unless facing fire or imminent disaster.',
      'DO NOT give food or water to unconscious or severely injured victims.'
    ],
    emergencyContacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'Highway Emergency Helpline', number: '1033' },
      { label: 'Traffic Police Helpline', number: '1073' },
      { label: 'Ambulance', number: '102' }
    ]
  }
];
