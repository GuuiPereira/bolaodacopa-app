import {
  Alert as AlertNb,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Box,
  Collapse
} from "native-base";
import { useState } from "react";

interface Props {
  msg: string,
  title: string,
  type?: 'success' | 'error' | 'info' | 'warning'
}
export function Alert({ msg, title, type = 'success' }: Props) {

  const [show, setShow] = useState(true);

   return (
    <Box w="100%" position="absolute" bottom={10}>
      <Collapse isOpen={show} height={show ? "100%" : 0}>
        <AlertNb minWidth="300px" maxW="400" status={type}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <AlertNb.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                  color: "coolGray.800"
                }}>
                  {title}
                </Text>
              </HStack>
              <IconButton variant="unstyled" _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size="3" />} _icon={{
                color: "coolGray.600"
              }} onPress={() => setShow(false)} />
            </HStack>
            <Box pl="6" _dark={{
              _text: {
                color: "coolGray.600"
              }
            }}>
              {msg}
            </Box>
          </VStack>
        </AlertNb>
      </Collapse>
    </Box>


  )
}