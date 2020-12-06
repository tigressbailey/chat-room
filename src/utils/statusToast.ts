import { createStandaloneToast } from '@chakra-ui/react'

interface ToastParams {
  status: 'info' | 'warning' | 'success' | 'error'
  title: string
}

const POSITION = 'top-right'
const DURATION = 6000

const toast = createStandaloneToast()

const statusToast = ({ status, title }: ToastParams) => {
  toast({
    position: POSITION,
    title,
    status,
    duration: DURATION,
    isClosable: true,
  })
}

export default statusToast
