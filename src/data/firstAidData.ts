import { FirstAidGuide } from '../types';

export const firstAidGuides: FirstAidGuide[] = [
  {
    id: 'cpr',
    title: 'Cardiopulmonary Resuscitation (CPR)',
    icon: '🫀',
    urgency: 'critical',
    immediateActions: [
      'Check scene safety, then tap the person\'s shoulders firmly: "Are you okay?"',
      'If unresponsive and not breathing (or only gasping): CALL 112 IMMEDIATELY or designate someone to call and fetch an AED.'
    ],
    steps: [
      'Position the patient flat on their back on a firm, level surface.',
      'Place the heel of one hand in the center of the chest (lower half of sternum), and interlock fingers with your other hand.',
      'Keep arms straight, position shoulders directly above hands, and push hard and fast.',
      'Compress at a rate of 100 to 120 beats per minute (to the rhythm of "Stayin\' Alive"). Depth: at least 2 inches (5 cm) for adults.',
      'Allow full chest recoil between compressions without taking hands completely off the chest.',
      'If trained: perform 30 chest compressions followed by 2 rescue breaths (head tilt, chin lift, seal nose). If untrained, perform Hands-Only CPR continuously.',
      'If an Automated External Defibrillator (AED) arrives: turn it on immediately and follow the automated voice prompts.'
    ],
    doNot: [
      'DO NOT stop CPR until the person begins breathing normally, an AED instructs you to pause, or emergency medics arrive.',
      'DO NOT hesitate to push deep; fractured ribs heal, but cardiac arrest without compressions is fatal within minutes.',
      'DO NOT give rescue breaths if untrained or uncomfortable; Hands-Only continuous compressions save lives.'
    ],
    seekHelpWhen: [
      'IMMEDIATE LIFE THREAT: Call 112 as the very first step whenever someone is unresponsive and breathless.'
    ]
  },
  {
    id: 'severe_bleeding',
    title: 'Severe Bleeding & Hemorrhage',
    icon: '🩸',
    urgency: 'critical',
    immediateActions: [
      'Call 112 immediately if blood is spurting, pooling rapidly, or does not stop after 5 minutes of pressure.',
      'Protect yourself: wear sterile gloves or use a waterproof plastic barrier if available.'
    ],
    steps: [
      'Apply direct, firm, and continuous pressure on the wound using a clean cloth, sterile gauze, or gloved hands.',
      'Keep pressure applied without lifting the cloth to check the wound (lifting disrupts blood clotting).',
      'If blood soaks through, add another pad/cloth on top and continue pressing even harder.',
      'Elevate the injured limb above the level of the heart if there are no signs of broken bones.',
      'Secure the dressing firmly with an elastic bandage once bleeding slows.',
      'If life-threatening limb hemorrhage cannot be stopped with pressure, apply a commercial windlass tourniquet 2-3 inches above the wound (never over a joint). Tighten until bleeding stops, and note the application time.'
    ],
    doNot: [
      'DO NOT remove embedded objects (knives, glass, metal shards); stabilize the object in place with rolled bandages and apply pressure around it.',
      'DO NOT remove blood-soaked bandages; always layer fresh bandages over them.',
      'DO NOT apply a tourniquet over a joint (elbow, knee) or directly on the neck or torso.'
    ],
    seekHelpWhen: [
      'Blood is pumping or spurting in rhythm with heartbeat.',
      'Bleeding fails to stop after 10 minutes of direct pressure.',
      'Patient exhibits signs of shock: pale skin, cold sweats, dizziness, or rapid pulse.'
    ]
  },
  {
    id: 'choking',
    title: 'Choking & Airway Obstruction',
    icon: '🗣️',
    urgency: 'critical',
    immediateActions: [
      'Determine if airway is completely obstructed: Ask "Are you choking?" If they can speak, cough loudly, or breathe, encourage coughing and DO NOT interfere.',
      'If the person CANNOT speak, breathe, or make sound, or gives the universal choking sign (hands clutching throat), ACT IMMEDIATELY.'
    ],
    steps: [
      'Stand behind the victim, place one arm across their upper chest for support, and lean the person forward.',
      'Deliver 5 forceful Back Blows between the shoulder blades with the heel of your hand.',
      'If obstruction persists, perform 5 Abdominal Thrusts (Heimlich Maneuver): Make a fist with one hand, place thumb-side against the middle of the abdomen just above the navel.',
      'Grasp your fist with your other hand and deliver quick, upward and inward thrusts.',
      'Alternate between 5 back blows and 5 abdominal thrusts until the airway is clear or person becomes unconscious.',
      'If the person loses consciousness: lower them safely to the floor, call 112, and start CPR compressions. Inspect mouth before breaths; remove visible objects (never blind finger sweep).'
    ],
    doNot: [
      'DO NOT perform abdominal thrusts on infants under 1 year (use alternating 5 gentle back slaps and 5 chest thrusts with 2 fingers).',
      'DO NOT perform blind finger sweeps inside the mouth as this can push the object deeper down the airway.',
      'DO NOT slap a person on the back if they are upright and actively coughing on their own.'
    ],
    seekHelpWhen: [
      'Person loses consciousness or cannot dislodge the obstruction within 1 minute.',
      'Anyone who has undergone abdominal thrusts should still receive medical evaluation to check for internal trauma.'
    ]
  },
  {
    id: 'burns',
    title: 'Burns & Scalds',
    icon: '🩹',
    urgency: 'high',
    immediateActions: [
      'Stop the burning process: remove person from heat source, smother flames, or rinse chemicals with copious water.',
      'Call 112 if burns cover a large area, involve face, hands, groin, major joints, or appear charred / white / leathery.'
    ],
    steps: [
      'Cool the burn immediately under gentle, cool running tap water for at least 10 to 20 minutes.',
      'Gently remove tight rings, watches, belts, or jewelry near the burned area before swelling starts.',
      'Cover the burn loosely with a clean, sterile, non-stick dressing or clean plastic cling film.',
      'Keep the person warm with a blanket over unburned areas to prevent hypothermia.',
      'Over-the-counter pain relief (paracetamol, ibuprofen) may be used for minor first-degree burns if tolerated.'
    ],
    doNot: [
      'DO NOT use ice or freezing water; extreme cold damages delicate skin tissue and accelerates necrosis.',
      'DO NOT apply butter, toothpaste, oil, turmeric, or household ointments to burns.',
      'DO NOT burst blisters; intact blisters form a natural sterile barrier against severe infections.',
      'DO NOT peel away clothing stuck to burned skin; gently cut around adhering fabric.'
    ],
    seekHelpWhen: [
      'Burn is larger than the palm of the victim’s hand.',
      'All chemical or electrical burns require urgent emergency room evaluation.',
      'Signs of inhalation injury: singed nasal hair, soot in mouth/pharynx, coughing, or hoarseness.'
    ]
  },
  {
    id: 'fractures',
    title: 'Fractures & Sprains',
    icon: '🦴',
    urgency: 'medium',
    immediateActions: [
      'Keep the injured limb completely still; do NOT attempt to realign or push bones back into place.',
      'Call 112 if the fracture is open (bone piercing skin), causes severe bleeding, or numbness in toes/fingers.'
    ],
    steps: [
      'Support and immobilize the injured area above and below the suspected fracture site.',
      'If open fracture: cover the wound with a sterile dressing to prevent contamination; apply gentle pressure around bone if bleeding.',
      'Apply an ice pack wrapped in a cloth towel for 15-20 minutes at a time to reduce swelling (never place ice directly on bare skin).',
      'Immobilize with a splint (rolled magazines, folded cardboard, or a padded board) secured loosely with cloth strips if medical help is delayed.',
      'Elevate the injured limb if possible without causing additional pain.'
    ],
    doNot: [
      'DO NOT try to straighten a crooked or deformed bone or joint.',
      'DO NOT move a person with suspected head, neck, or spinal injuries unless facing immediate danger.',
      'DO NOT test mobility by forcing the injured person to bear weight or walk.'
    ],
    seekHelpWhen: [
      'Open fracture with visible bone fragments.',
      'Limb is cold, pale, or blue below the injury, or the patient feels numbness/tingling.',
      'Severe deformity or uncontrollable agony upon the slightest movement.'
    ]
  },
  {
    id: 'fainting',
    title: 'Fainting & Syncope',
    icon: '💫',
    urgency: 'medium',
    immediateActions: [
      'Catch the falling person safely if possible to prevent traumatic head impact.',
      'Lay the person flat on their back and check if they are breathing normally.'
    ],
    steps: [
      'Elevate their feet and legs about 12 inches (30 cm) above heart level to restore blood flow to the brain.',
      'Loosen restrictive clothing around the neck, collar, and waist.',
      'Ensure plenty of fresh air: clear bystanders and open nearby windows or ventilate.',
      'If the person does not regain consciousness within 1 minute, roll them into the Recovery Position and call 112 immediately.',
      'Once awake, have them rest quietly for 10-15 minutes before attempting to sit or stand slowly.'
    ],
    doNot: [
      'DO NOT force the person to stand up immediately; sudden standing can trigger another syncopal blackout.',
      'DO NOT pour water on their face or slap them to wake them up.',
      'DO NOT administer food, drinks, or oral glucose until the person is 100% conscious and alert.'
    ],
    seekHelpWhen: [
      'Unconsciousness lasts longer than 1 minute.',
      'Fainting occurs with chest pain, shortness of breath, irregular heartbeat, or numbness.',
      'The person experienced a hard head impact during the fall.'
    ]
  }
];
