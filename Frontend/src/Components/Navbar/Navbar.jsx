import React from "react";
import { useContext } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Image,
  Input,
  Button,
  Divider,
  Grid,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { AppContext } from "../../Context/Theme";
import meesho from "../Images/meesho.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [value, setvalue] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Theme, ToggleTheme } = useContext(AppContext);

  const light = {
    backgroundColor: "white",
    color: "black",
  };

  const dark = {
    backgroundColor: "black",
    color: "white",
  };
  const handlevalue = (e) => {
    setvalue(e.target.value);
    setTimeout(() => {
      localStorage.setItem("value", e.target.value);
    }, 2000);
  };
  return (
    <>
      <Box borderBottom={"1px solid grey"} position={"sticky"} top={0}>
        <Box
          borderBottom={"1px solid grey"}
          py={"4px"}
          zIndex={9}
          w="100%"
          style={Theme === "light" ? light : dark}
        >
          <Flex justifyContent={"space-between"} gap="10px">
            <IconButton
              style={Theme === "light" ? light : dark}
              size="lg"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize="30px" />}
              aria-label="Open Menu"
              display={{ md: "none" }}
              marigin-top="15px"
              boreder="1px solid blue"
              onClick={isOpen ? onClose : onOpen}
            />

            <Flex
              justifyContent={"space-between"}
              alignItems="center"
              w="95%"
              m={"auto"}
              gap="100px"
            >
              <Flex gap="40px">
                <Link to="/">
                  {" "}
                  <Image
                    h={{ base: "20px", md: "40px", lg: "40px" }}
                    width={{ base: "100px", md: "140px", lg: "190px" }}
                    src={meesho}
                  />
                </Link>

                <Flex gap="10px" border={"1px solid grey"}>
                  <Search2Icon color="grey" margin={"5px"} />
                  {/* Input model */}
                  <Popover>
                    <PopoverTrigger>
                      <Button color={"none"} colorScheme="none">
                        {" "}
                        <Input
                          onChange={handlevalue}
                          variant="unstyled"
                          placeholder={`Try Saree,Kurta or Search by product code`}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />

                      <PopoverHeader>Popular Searches</PopoverHeader>
                      <PopoverBody>
                        <Grid templateColumns={"repeat(3, 1fr)"} gap="10px">
                          <Text
                            border="1px solid black"
                            borderRadius={"10px"}
                            paddng="3px"
                            padding="5px"
                          >
                            smartphones
                          </Text>
                          <Text
                            border="1px solid black"
                            borderRadius={"10px"}
                            paddng="3px"
                            padding="5px"
                          >
                            skincare
                          </Text>
                          <Text
                            border="1px solid black"
                            borderRadius={"10px"}
                            paddng="3px"
                            padding="5px"
                          >
                            groceries
                          </Text>
                          <Text
                            border="1px solid black"
                            borderRadius={"10px"}
                            paddng="3px"
                            padding="5px"
                          >
                            furniture
                          </Text>
                          <Text
                            border="1px solid black"
                            borderRadius={"10px"}
                            paddng="3px"
                            padding="5px"
                          >
                            tops
                          </Text>
                        </Grid>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  {/* <Input variant='unstyled' placeholder={`Try Saree,Kurta or Search by product code`} /> */}
                </Flex>
              </Flex>

              <Flex
                as={"nav"}
                display={{ base: "none", md: "flex" }}
                gap="23px"
                w={{ base: "", md: "30%", lg: "60%" }}
                justifyContent="space-around"
                alignItems="center"
              >
                {/* Dowload button */}
                <Box cursor="pointer">
                  <Popover>
                    <PopoverTrigger>
                      <Text>Download App</Text>
                    </PopoverTrigger>
                    <PopoverContent width={"200px"}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Download From </PopoverHeader>
                      <PopoverBody>
                        <Box justifyContent={"space-around"}>
                          <Image
                            width="200px"
                            src="https://images.meesho.com/images/pow/playstore-icon-big.webp"
                          />
                        </Box>
                      </PopoverBody>
                      <hr />
                      <PopoverBody>
                        <Box justifyContent={"space-around"}>
                          <Image
                            width="200px"
                            src="https://images.meesho.com/images/pow/appstore-icon-big.webp"
                          />
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>

                <Text height="50px" border={"1px solid grey"}></Text>

                <Text cursor="pointer">Become a Supplier </Text>

                <Text height="50px" border={"1px solid grey"}></Text>
                {/* Profile button */}
                <Box cursor="pointer" zindex={1}>
                  <Popover position="relative" zIndex={9999}>
                    <PopoverTrigger>
                      <Text>Profile</Text>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Manage Account</PopoverHeader>
                      <PopoverBody>
                        <Box>
                          <Text>Vishal</Text>
                          <Text>1234567890</Text>
                        </Box>
                      </PopoverBody>

                      <PopoverBody>My Orders</PopoverBody>
                      <hr />
                      <PopoverBody>Log Out</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>

                <Link to="/cart" cursor="pointer">
                  Cart
                </Link>
              </Flex>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box
              pb={4}
              display={{ md: "none" }}
              style={Theme === "light" ? light : dark}
            >
              <Stack as={"nav"} spacing={4} color="goldenrod" fontWeight="600">
                <Link to="/product" cursor="pointer">
                  Womens
                </Link>
                <Text cursor="pointer">Mens</Text>
                <Text cursor="pointer">Kids</Text>
                <Text cursor="pointer">Electronics</Text>
                <Text cursor="pointer">Profile</Text>
              </Stack>
            </Box>
          ) : null}
        </Box>

        <Flex
          border={"1px solid re"}
          style={Theme === "light" ? light : dark}
          width={"100%"}
          margin="auto"
          display={{ base: "none", md: "flex", lg: "flex" }}
          gap="14px"
          padding={"20px"}
          justifyContent="space-around"
          alignItems="center"
        >
          <Link to="/product" cursor="pointer">
            Women Ethnic{" "}
          </Link>
          <Link to="/product" cursor="pointer">
            Women Western{" "}
          </Link>
          <Text cursor="pointer">Men</Text>
          <Text cursor="pointer">Kids</Text>
          <Text cursor="pointer">Home & Kitchen</Text>
          <Text cursor="pointer">Beauty & Health</Text>
          <Text cursor="pointer">Jewellery & Accessories </Text>
          <Text cursor="pointer">Bags & Footwear</Text>
          <Text cursor="pointer">Electronics</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
