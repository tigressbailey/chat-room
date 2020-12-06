import React, { ChangeEvent } from 'react'
import { Text, Switch, Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { publishStream, setMuted, setPublished } from '../actions/agoraStatesActions'
import { RootState } from '../reducers/rootReducer'
import toast from '../utils/statusToast'

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

const SwitchGroup: React.FC = () => {
  const dispatch = useDispatch()
  const { localStream, client, published, muted } = useSelector((state: RootState) => state.agoraStates)

  const unpublishStream = (localStream: any, agoraClient: any) => {
    if (localStream) {
      agoraClient.unpublish(localStream)
      dispatch(setPublished(false))
      toast({
        title: 'Stream unpublished',
        status: 'info',
      })
    }
  }

  const muteAudio = () => {
    localStream.muteAudio()
    dispatch(setMuted(true))
    toast({
      status: 'info',
      title: 'Muted',
    })
  }

  const unmuteAudio = () => {
    localStream.unmuteAudio()
    dispatch(setMuted(false))
    toast({
      status: 'info',
      title: 'Unmuted',
    })
  }

  const onMutedChanged: ChangeHandler = (e) => {
    if (!e.target.checked) {
      unmuteAudio()
    } else {
      muteAudio()
    }
  }

  const onPublishedChanged: ChangeHandler = (e) => {
    if (!e.target.checked) {
      unpublishStream(localStream, client)
    } else {
      dispatch(publishStream(localStream, client))
    }
  }

  return (
    <>
      <Box>
        <Text mb="8px">Muted:</Text>
        <Switch isChecked={muted} onChange={onMutedChanged} />
      </Box>
      <Box marginBottom={'15px'}>
        <Text mb="8px">Published:</Text>
        <Switch isChecked={published} onChange={onPublishedChanged} />
      </Box>
    </>
  )
}

export default SwitchGroup
