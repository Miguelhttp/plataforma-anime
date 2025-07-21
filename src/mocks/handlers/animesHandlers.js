import { http, HttpResponse } from 'msw';

export const animesHandlers = [
  http.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
    return HttpResponse.json(
      ctx.status(200),
      ctx.json({
        data: [
          {
            mal_id: 1,
            title: 'Cowboy Bebop',
            images: {
              jpg: {
                image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
              },
            },
            score: 8.75,
            type: "TV"
          },
        ],
      })
    );
  }),
];
