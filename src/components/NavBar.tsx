import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
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
            <Flex>
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
        <Flex bg="blue.400" p={4}>
            <Box ml={"auto"}>{body}</Box>
        </Flex>
    );
};
