import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import EditNotes from './EditNotes'


const ModalEdit = ({ data }) => {
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
        colorScheme='green'
      >
        Edit
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditNotes data={data} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalEdit