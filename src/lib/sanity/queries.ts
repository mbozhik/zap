import {defineQuery} from 'next-sanity'

export const INDEX_QUERY = defineQuery(`
  *[_type == "layout" && name == 'Главная страница'][0]{
    hero, mechanics, advantages, reviews, questions
  }`)

export const USERS_QUERY = defineQuery(`
  *[_type == "users"]{
    type, grid
  }`)
