import { Box, Heading } from "@chakra-ui/react";
import React from "react";

function Navbar() {
    return (
        <Box h={"3rem"} w={'100%'} bg={'teal'} textAlign={'center'}>
            <Heading fontSize={'2rem'}>APP TO-DO</Heading>
        </Box>
    )
}

export default Navbar