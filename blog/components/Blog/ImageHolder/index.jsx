import { Box, Center, Image } from "@chakra-ui/react";

export function ImageHolder({ ...props }) {
    return (
        <Center padding={[2, 4]}>
            <Image
                rounded={'20'}
                objectFit={'cover'}
                width={['100%', '50%']}
                {...props}
            />
        </Center>
    )
}