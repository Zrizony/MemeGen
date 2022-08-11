'use strict'

const STORAGE_KEY = 'memeDB'

var gImgs = [
  {
    id: 1,
    url: 'imgs/1.jpg',
    keywords: ['speech', 'funny', 'politic'],
  },
  {
    id: 2,
    url: 'imgs/2.jpg',
    keywords: ['puppy', 'cute', 'kiss'],
  },
  {
    id: 3,
    url: 'imgs/3.jpg',
    keywords: ['cute', 'puppy', 'baby'],
  },
  {
    id: 4,
    url: 'imgs/4.jpg',
    keywords: ['cat', 'funny', 'sleep'],
  },
  {
    id: 5,
    url: 'imgs/5.jpg',
    keywords: ['baby', 'funny', 'classic'],
  },
  {
    id: 6,
    url: 'imgs/6.jpg',
    keywords: ['aliens', 'funny', 'history'],
  },
  {
    id: 7,
    url: 'imgs/7.jpg',
    keywords: ['nigger', 'funny', 'baby'],
  },
  {
    id: 8,
    url: 'imgs/8.jpg',
    keywords: ['movie', 'funny', 'classic'],
  },
  {
    id: 9,
    url: 'imgs/9.jpg',
    keywords: ['baby', 'funny', 'cute'],
  },
  {
    id: 10,
    url: 'imgs/10.jpg',
    keywords: ['smile', 'funny', 'politic'],
  },
  {
    id: 11,
    url: 'imgs/11.jpg',
    keywords: ['nigger', 'funny', 'gay'],
  },
  {
    id: 12,
    url: 'imgs/12.jpg',
    keywords: ['old', 'funny', 'classic'],
  },
  {
    id: 13,
    url: 'imgs/13.jpg',
    keywords: ['movie', 'funny', 'classic'],
  },
  {
    id: 14,
    url: 'imgs/14.jpg',
    keywords: ['movie', 'serius', 'nigger'],
  },
  {
    id: 15,
    url: 'imgs/15.jpg',
    keywords: ['movie', 'funny', 'classic'],
  },
  {
    id: 16,
    url: 'imgs/16.jpg',
    keywords: ['movie', 'funny', 'classic'],
  },
  {
    id: 17,
    url: 'imgs/17.jpg',
    keywords: ['animation', 'funny', 'classic'],
  },
  {
    id: 18,
    url: 'imgs/18.jpg',
    keywords: ['speech', 'funny', 'politic'],
  },
]

function getImgForDisplay() {
  const IMGS = gImgs
  return IMGS
}

function getImgById(imgId) {
  const imgs = gImgs
  let img = imgs.find((el) => el.id == imgId)

  return img
}
