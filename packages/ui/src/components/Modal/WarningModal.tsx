import { useEffect } from 'react'
import { Close } from '@mui/icons-material'
import Modal from './index'
import { Typography, Box, Button } from '@mui/material'
import useModal from '@/hooks/useModal'

const isDev = process.env.NODE_ENV === 'development'

export default function WarningModal() {
  const { showModal, hideModal } = useModal()

  useEffect(() => {
    if (isDev) return
    showModal(<WarningModalContent onDismiss={hideModal} />)
  }, [hideModal, showModal])

  return <></>
}

export function WarningModalContent({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Modal maxWidth="608px" width="100%">
      <Box display="grid" gap="24px" width="100%" padding="32px">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <div />
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            Warning!
          </Typography>
          <Close onClick={onDismiss} sx={{ cursor: 'pointer' }} />
        </Box>

        <Typography variant="inherit">
          Please note.The dapp is only open to non-U.S. persons and entities. All registrants must meet eligibility
          requirements to participate.
          <br />
          <br />
          The dapp is not and will not be offered or sold, directly or indirectly, to any person who is a resident,
          organized, or located in any country or territory subject to OFAC comprehensive sanctions programs from time
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          to time, including Cuba, Crimea region of Ukraine, Democratic People's Republic of Korea, Iran, Syria, or any
          person found on the OFAC specially designated nationals or blocked persons list, or any other consolidated
          prohibited persons list as determined by any applicable governmental authority.
        </Typography>
        <Typography variant="inherit">The project is in beta, use at your own risk.</Typography>
        <Button onClick={onDismiss}>Understand</Button>
      </Box>
    </Modal>
  )
}
