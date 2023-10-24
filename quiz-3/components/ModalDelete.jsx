import { useMutation } from '@/hooks/useMutation'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ModalDelete = ({ data }) => {

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const { mutate } = useMutation()
  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()
    await mutate({
      url: `/api/notes/delete/${data?.id}`,
      method: 'DELETE'
    })
    router.push('/')
    onClose()
  }
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
        colorScheme='red'
      >
        Delete
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Delete Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are your sure delete this notes?</Text>
          </ModalBody>
          <ModalFooter className='gap-2'>
            <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
            <Button colorScheme='blackAlpha' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDelete