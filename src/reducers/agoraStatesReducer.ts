import {
  SET_AGORA_CLIENT,
  SET_ISJOINED,
  SET_PUBLISHED,
  SET_IS_LOADING,
  SET_LOCAL_STREAM,
  ADD_REMOTE,
  REMOVE_REMOTE,
  RESET_STREAMS,
  SET_MUTED,
  SET_APP_ID,
  SET_CHANNEL,
  SET_TOKEN,
} from '../actions/actionTypes'

interface AgoraStates {
  appId: string | undefined
  channel: string | undefined
  token: string | undefined
  mode: string
  codec: string
  client: any | null
  localStream: any | null
  isLoading: boolean
  published: boolean
  isJoined: boolean
  remoteStreamList: any[]
  muted: boolean
}

const initialState: AgoraStates = {
  appId: process.env.REACT_APP_AGORA_APP_ID,
  channel: process.env.REACT_APP_CHANNEL_NAME,
  token: process.env.REACT_APP_TEMP_TOKEN,
  mode: 'rtc',
  codec: 'h264',
  client: null,
  localStream: null,
  isLoading: false,
  published: false,
  isJoined: false,
  remoteStreamList: [],
  muted: false,
}

export const agoraStatesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AGORA_CLIENT:
      return {
        ...state,
        client: action.payload,
      }
    case SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SET_PUBLISHED:
      return {
        ...state,
        published: action.payload,
      }
    case SET_ISJOINED:
      return {
        ...state,
        isJoined: action.payload,
      }
    case ADD_REMOTE:
      return {
        ...state,
        remoteStreamList: [...state.remoteStreamList, action.payload],
      }
    case REMOVE_REMOTE:
      return {
        ...state,
        remoteStreamList: state.remoteStreamList.filter((item) => item.getId() !== action.payload),
      }
    case RESET_STREAMS:
      return {
        ...state,
        localStream: null,
        remoteStreamList: [],
      }
    case SET_MUTED:
      return {
        ...state,
        muted: action.payload,
      }
    case SET_APP_ID:
      return {
        ...state,
        appId: action.payload,
      }
    case SET_CHANNEL:
      return {
        ...state,
        channel: action.payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
  }
  return state
}

export default agoraStatesReducer
