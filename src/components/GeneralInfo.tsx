import React, { ChangeEvent } from 'react'
import { Text, Input, Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setAppId, setChannel, setToken } from '../actions/agoraStatesActions'
import { RootState } from '../reducers/rootReducer'

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

const GeneralInfo: React.FC = () => {
  const dispatch = useDispatch()
  const { appId, channel, token } = useSelector((state: RootState) => state.agoraStates)

  const onAppIdChanged: ChangeHandler = (e) => dispatch(setAppId(e.target.value))
  const onChannelChanged: ChangeHandler = (e) => dispatch(setChannel(e.target.value))
  const onTokenChanged: ChangeHandler = (e) => dispatch(setToken(e.target.value))

  return (
    <>
      <Box>
        <Text mb="8px">APP ID</Text>
        <Input value={appId} placeholder="APP ID" isRequired onChange={onAppIdChanged} />
      </Box>
      <Box>
        <Text mb="8px">Channel</Text>
        <Input value={channel} placeholder="Channel" isRequired onChange={onChannelChanged} />
      </Box>
      <Box>
        <Text mb="8px">Token</Text>
        <Input value={token} placeholder="Token" isRequired onChange={onTokenChanged} />
      </Box>
    </>
  )
}

export default GeneralInfo
