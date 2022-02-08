import React from "react";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    let body = null;

    // data is loading
    if (fetching) {
        console.log("fetching");
        // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr={2}>
                        Login
                    </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white" ml={2}>
                        Register
                    </Link>
                </NextLink>
            </>
        );
        // user is logged in
    } else {
        body = (
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button as={Link} colorScheme="blue" mr={4}>
                        Create Post
                    </Button>
                </NextLink>
                <Box mr={2} color="white">
                    {data.me.username}
                </Box>
                <Button
                    onClick={() => {
                        logout();
                    }}
                    variant="link"
                    isLoading={logoutFetching}
                >
                    logout
                </Button>
            </Flex>
        );
    }
    return (
        <Flex
            zIndex={1}
            position="sticky"
            top={0}
            bg="blue.400"
            p={4}
            align="center"
        >
            <Flex flex={1} m="auto" maxW={800}>
                <NextLink href="/">
                    <Link>
                        <Heading>Frigid</Heading>
                    </Link>
                </NextLink>
                <Box ml={"auto"}>{body}</Box>
            </Flex>
        </Flex>
    );
};
