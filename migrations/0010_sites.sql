-- Personal site builds. A sales file, not a classified.
insert into products (id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort) values
  (
    'site-card',
    'service',
    'site-card',
    'Link card',
    'Personal site',
    'One page. Stage name, pronouns, links, one still. An age door. Live in seven days. No explicit media on the domain.',
    69000,
    '/still-hands.jpg',
    null,
    53
  ),
  (
    'site-folio',
    'service',
    'site-folio',
    'Folio site',
    'Personal site',
    'Five pages. About, work, press, contact, and the door. Your domain or one we hold. Live in fourteen days.',
    180000,
    '/still-talent.jpg',
    null,
    54
  ),
  (
    'site-house',
    'service',
    'site-house',
    'House site',
    'Personal site',
    'The folio, plus a booking note, a press kit, and thirty days of changes after it goes live. Twenty-one days to first draft.',
    360000,
    '/hero-corridor.jpg',
    null,
    55
  )
on conflict (id) do nothing;
