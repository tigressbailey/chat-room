import AgoraRTC from '../utils/agoraEhancer'
import { AppThunk } from '../store'
import toast from '../utils/statusToast'
import {
  SET_AGORA_CLIENT,
  SET_LOCAL_STREAM,
  SET_ISJOINED,
  SET_PUBLISHED,
  SET_IS_LOADING,
  ADD_REMOTE,
  REMOVE_REMOTE,
  RESET_STREAMS,
  SET_MUTED,
  SET_APP_ID,
  SET_CHANNEL,
  SET_TOKEN,
} from '../actions/actionTypes'

export const setAgoraClient = (client: any) => {
  return {
    type: SET_AGORA_CLIENT,
    payload: client,
  }
}

export const setLocalStream = (stream: any) => {
  return {
    type: SET_LOCAL_STREAM,
    payload: stream,
  }
}

export const setIsJoined = (isJoined: boolean) => {
  return {
    type: SET_ISJOINED,
    payload: isJoined,
  }
}

export const setPublished = (published: boolean) => {
  return {
    type: SET_PUBLISHED,
    payload: published,
  }
}

export const setIsLoading = (isLoading: boolean) => {
  return {
    type: SET_IS_LOADING,
    payload: isLoading,
  }
}

export const addRemote = (stream: any) => {
  return {
    type: ADD_REMOTE,
    payload: stream,
  }
}

export const removeRemote = (id: number) => {
  return {
    type: REMOVE_REMOTE,
    payload: id,
  }
}

export const resetStreams = () => {
  return { type: RESET_STREAMS }
}

export const setMuted = (muted: boolean) => {
  return { type: SET_MUTED, payload: muted }
}

export const joinChatRoom = (currentState: any): AppThunk => async (dispatch) => {
  try {
    const { appId, channel, uid, token, mode, codec } = currentState

    const agoraClient = AgoraRTC.createClient({ mode: mode, codec: codec })

    dispatch(setAgoraClient(agoraClient))
    dispatch(setIsLoading(true))

    const currentUid = isNaN(Number(uid)) ? null : Number(uid)

    await agoraClient.init(appId)

    await agoraClient.join(token, channel, currentUid)

    const stream = AgoraRTC.createStream({
      video: true,
      audio: true,
      screen: false,
    })

    await stream.init()

    await agoraClient.publish(stream)

    dispatch(setLocalStream(stream))
    dispatch(setPublished(true))
    dispatch(setIsJoined(true))

    toast({
      status: 'info',
      title: `Joined channel ${channel}`,
    })
  } catch (err) {
    toast({
      status: 'error',
      title: `Failed to join, ${err}`,
    })
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const leaveChatRoom = (localStream: any, agoraClient: any): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsLoading(true))

    if (localStream) {
      localStream.close()

      agoraClient.unpublish(localStream)
    }

    await agoraClient.leave()

    dispatch(resetStreams())
    dispatch(setPublished(false))
    dispatch(setMuted(false))
    dispatch(setIsJoined(false))

    toast({
      status: 'info',
      title: 'Left chat room',
    })
  } catch (err) {
    toast({
      status: 'error',
      title: `Failed to leave, ${err}`,
    })
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const publishStream = (localStream: any, agoraClient: any): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    if (localStream) {
      await agoraClient.publish(localStream)
      dispatch(setPublished(true))
    }

    toast({
      status: 'info',
      title: 'Stream published',
    })
  } catch (err) {
    toast({
      status: 'error',
      title: `Failed to publish, ${err}`,
    })
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const setAppId = (id: string) => {
  return {
    type: SET_APP_ID,
    payload: id,
  }
}

export const setChannel = (channel: string) => {
  return {
    type: SET_CHANNEL,
    payload: channel,
  }
}

export const setToken = (token: string) => {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}
