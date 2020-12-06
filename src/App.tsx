import React, { useEffect } from 'react'
import { Container, Divider, Box, Flex } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import StreamPlayer from 'agora-stream-player'
import { RootState } from './reducers/rootReducer'
import { addRemote, removeRemote } from './actions/agoraStatesActions'
import toast from './utils/statusToast'
import GeneralInfo from './components/GeneralInfo'
import SwitchGroup from './components/SwitchGroup'
import ButtonGroup from './components/ButtonGroup'
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const agoraStates = useSelector((state: RootState) => state.agoraStates)

  const { localStream, isJoined, client, remoteStreamList } = agoraStates

  useEffect(() => {
    const doSubCallback = (evt: any) => {
      client.subscribe(evt.stream)
    }

    const addRemoteCallback = (evt: any) => {
      const { stream } = evt
      dispatch(addRemote(stream))
      toast({
        status: 'info',
        title: 'Remote added',
      })
    }

    const removeRemoteCallback = (evt: any) => {
      const { uid } = evt
      if (uid) {
        dispatch(removeRemote(uid))
        toast({
          status: 'info',
          title: 'Remote removed',
        })
      }
    }

    if (client) {
      client.on('stream-added', doSubCallback)
      client.on('stream-subscribed', addRemoteCallback)
      client.on('peer-leave', removeRemoteCallback)
    }

    return () => {
      if (client) {
        client.gatewayClient.removeEventListener('stream-added', doSubCallback)
        client.gatewayClient.removeEventListener('stream-subscribed', addRemoteCallback)
        client.gatewayClient.removeEventListener('peer-leave', removeRemoteCallback)
      }
    }
  }, [client, dispatch])

  return (
    <div className="app">
      <header className="app-header">
        <Container>
          {isJoined ? <SwitchGroup /> : <GeneralInfo />}
          <Divider />
          <Box marginTop={'15px'}>
            <ButtonGroup />
          </Box>
        </Container>
      </header>
      <section className="app-content">
        <Flex justifyContent={'center'}>
          <Box>{localStream && <StreamPlayer stream={localStream} fit="contain" label="local" />}</Box>
          {remoteStreamList.map((stream: any) => (
            <Box key={stream.getId()}>
              <StreamPlayer stream={stream} fit="contain" label={stream.getId()} />
            </Box>
          ))}
        </Flex>
      </section>
    </div>
  )
}

export default App
