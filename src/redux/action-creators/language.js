import {STE_LANGUAGE_SUCCESS} from '../action-types/language'


export const steLanguageSuccess = (language)=>({
  type:STE_LANGUAGE_SUCCESS,
  data:language
})