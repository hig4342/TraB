import { all, fork, put, delay, takeEvery } from 'redux-saga/effects'

function* countUpAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT_ASYNC' })
}

function* countDownAsync() {
  yield delay(1000)
  yield put({ type: 'DECREMENT_ASYNC' })
}

function* countResetAsync() {
  yield delay(1000)
  yield put({ type: 'RESET_ASYNC' })
}

function* countUp() {
  yield takeEvery('INCREMENT', countUpAsync)
}

function* countDown() {
  yield takeEvery('DECREMENT', countDownAsync)
}

function* countReset() {
  yield takeEvery('RESET', countResetAsync)
}

export default function* countSaga(){
  yield all([
      fork(countUp),
      fork(countDown),
      fork(countReset),
  ])
}