'use strict'

let gImgs = [
  {
    id: 1,
    url: 'imgs/1.jpg',
    keywords: ['WTF', 'funny', 'comic'],
  },
  {
    id: 2,
    url: 'imgs/2.jpg',
    keywords: ['reletable', 'trend', 'drown'],
  },
  {
    id: 3,
    url: 'imgs/3.jpg',
    keywords: ['spongebob', 'discover', 'cartoon'],
  },
  {
    id: 4,
    url: 'imgs/4.jpg',
    keywords: ['two panel', 'talk', 'funny'],
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
    keywords: ['two panel', 'funny', 'catroon'],
  },
  {
    id: 8,
    url: 'imgs/8.jpg',
    keywords: ['movie', 'funny', 'classic'],
  },
  {
    id: 9,
    url: 'imgs/9.jpg',
    keywords: ['vehicle', 'two panel', 'choice'],
  },
  {
    id: 10,
    url: 'imgs/10.jpg',
    keywords: ['anime', 'funny', 'run'],
  },
  {
    id: 11,
    url: 'imgs/11.jpg',
    keywords: ['nigger', 'funny', 'gay'],
  },
  {
    id: 12,
    url: 'imgs/12.jpg',
    keywords: ['two panel', 'choice', 'classic'],
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
    keywords: ['bad', 'funny', 'dark humor'],
  },
  {
    id: 18,
    url: 'imgs/18.jpg',
    keywords: ['animation', 'funny', 'classic'],
  },
]

function getImgForDisplay() {
  let imgs = gImgs
  return imgs
}

function getImgById(imgId) {
  const imgs = gImgs
  let img = imgs.find((el) => el.id == imgId)
  return img
}

function getImgBySearchFilter(val) {
  let imgs = gImgs.filter((img) =>
    img.keywords.find((element) => {
      if (element.includes(val)) {
        return true
      }
    })
  )
  return imgs
}
