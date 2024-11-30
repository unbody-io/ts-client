import { NumberField, StringField } from '../types'

export interface IGithubUser {
  id: StringField
  url: StringField
  login: StringField
  avatarUrl: StringField
}

export interface IGithubLabel {
  id: StringField
  name: StringField
  color: StringField
  url: StringField
}

export interface IGithubReaction {
  key: StringField
  total: NumberField
}
