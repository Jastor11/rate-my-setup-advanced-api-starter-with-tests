INSERT INTO users (email, password, is_admin)
VALUES (
  'person@person.person',
  '$2b$13$f2qgPNcCZwsVwx1ITU4nRu8aqzOMmtfODihIGW8cWGEr5RrSIei2m',
  FALSE
), (
  'them@them.us',
  '$2b$13$B3qUJpO.Fp8fcjKtoYzfu.HHQ1RPzldER95pvYZW1bXw3DtMWH/gK',
  FALSE
), (
  'you@you.you',
  '$2b$13$T33tCBzH5rwUPk88UZ92sejWVOY7qHFYMDxnAiw6VdYc49j0Q2Oi2',
  FALSE
);

INSERT INTO posts (user_id, caption, image_url)
VALUES (
  1,
  'My fancy workstation',
  'https://images.unsplash.com/photo-1596443019365-eb263a588404?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80'
), (
  2,
  'Very, very sweet setup',
  'https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
);

INSERT INTO ratings (rating, post_id, user_id)
VALUES (9, 2, 1),
       (7, 2, 3),
       (6, 1, 3);