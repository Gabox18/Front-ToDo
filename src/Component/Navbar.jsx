import { Box, Heading } from "@chakra-ui/react";
import React from "react";

function Navbar() {
    return (
        <Box h={"2.5rem"} w={'100%'} bg={'teal'}>
            <Heading fontSize={'1.7rem'}>APP TO-DO</Heading>
        </Box>
    )
}

export default Navbar