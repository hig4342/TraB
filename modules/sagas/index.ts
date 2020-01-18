import {all, call} from 'redux-saga/effects'
import countSaga from './countSaga'

export default function* rootSaga() {
  yield all([
    call(countSaga)
  ])
}