import React from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { joinChatRoom, leaveChatRoom } from '../actions/agoraStatesActions'
import { RootState } from '../reducers/rootReducer'

const ButtonGroup: React.FC = () => {
  const dispatch = useDispatch()
  const agoraStates = useSelector((state: RootState) => state.agoraStates)
  const { localStream, client, isLoading, isJoined } = agoraStates

  const onJoinClicked = () => {
    dispatch(joinChatRoom(agoraStates))
  }

  const onLeaveClicked = () => {
    dispatch(leaveChatRoom(localStream, client))
  }

  return (
    <>
      {isJoined ? (
        <Button colorScheme="blue" isLoading={isLoading} onClick={onLeaveClicked}>
          Leave
        </Button>
      ) : (
        <Button colorScheme="blue" isLoading={isLoading} onClick={onJoinClicked}>
          Join
        </Button>
      )}
    </>
  )
}

export default ButtonGroup
