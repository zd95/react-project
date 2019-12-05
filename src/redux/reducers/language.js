import { getItem } from '../../utils/local-storage'

import { STE_LANGUAGE_SUCCESS } from '../action-types/language'

//将用户设置语言类型保存至localStorage中/，并从中读取当前保存的语言类型
const initValue = getItem('i18nextLanguage') || window.navigator.language || 'en';

function language (prevsState = initValue,action){
  switch (action.type) {
    case STE_LANGUAGE_SUCCESS:
      return action.data
    default:
      return prevsState
  }
}

export default language