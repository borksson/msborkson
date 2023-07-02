import { Image, Link, useColorModeValue } from "@chakra-ui/react";

export function Logo() {
    return (
        <Link href="/">
            <Image src={useColorModeValue("/m-black.svg", "/m-white.svg")} alt="Logo" width={20} height={20} style={{padding: "10px"}} />
        </Link>
    )
}