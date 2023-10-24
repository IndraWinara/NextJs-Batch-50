import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateNotes from './CreateNotes'

const ModalCreate = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
        colorScheme='blackAlpha'
      >
        Create
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Create Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <CreateNotes onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreate